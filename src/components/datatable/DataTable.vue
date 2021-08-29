<template>
    <div v-loading="loading">
        <div class="scroll-wrapper">
            <div class="scroll-bar"></div>
        </div>
        <el-table
                :data="tableData"
                :row-class-name="rowClassName"
                :row-key="rowKey"
                @selection-change="handleSelectionChange"
                @sort-change="onSortChange"
                border
                height="900"
                ref="table"
                sortable="custom"
                style="width: 100%">
            <slot>
                <!-- column definitions here -->
            </slot>
        </el-table>

        <el-row class="mg-top-20 page-mobile" justify="center" type="flex" v-if="!nonePagination">
            <el-pagination
                    :current-page.sync="tableConfig.currentPage"
                    :next-text="$t('common.dataTable.next')"
                    :page-size="pageSize"
                    :prev-text="$t('common.dataTable.prev')"
                    :total="tableConfig.totalElements"
                    @current-change="renderTable"
                    background
                    layout=" prev, pager, next"
            />
        </el-row>
    </div>
</template>

<script lang="ts">
    /**
     *  Example: go page : /dataTableExample
     */
    //import AlertService from "@/service/alert.service";

    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
    import * as Element from 'element-ui/types/element-ui';
    import {
        filterMethod,
        getTableDataFn,
        PageRequest,
        SortDirection,
        sortMethod,
        TableConfig
    } from './types';
    import IDataTable from './IDataTable';
    import AlertService from '@/services/AlertService';
    import i18n from '@/i18n';

    enum Events {
        Multiple_Selection = 'multipleSelection'
    }

    @Component
    export default class DataTable extends Vue implements IDataTable {
        /* get table data function */
        @Prop({required: true}) getTableDataFn: getTableDataFn;

        @Prop({required: false, default: ''}) rowKey!: string | Function;

        @Prop({required: false, default: 1}) currentPage!: number;

        @Prop({required: false, default: 10}) pageSize!: number;

        /* set true if you want DataTable log running actions. */
        @Prop({required: false, default: false}) logging: boolean;

        /* weather to paging server side or on client side */
        @Prop({required: false, default: true}) serverPagination!: boolean;

        /* set data for table when use client paging */
        @Prop({required: false}) data!: Array<any>;

        /* set sortMethod when use client sort, accept 2 parameters: table data and sort option, must return table data after sort */
        @Prop({required: false}) sortMethod!: sortMethod;

        /* client side filter function */
        @Prop({required: false}) filterMethod!: filterMethod;

        /* when filter request change , DataTable auto call getTableDataFn to get new data */
        @Prop({required: false}) filterRequest!: object;

        @Prop({required: false}) rowClassName!: Function;

        @Prop({required: false, default: false}) nonePagination!: boolean;

        @Prop({required: false, default: false}) clientSort!: boolean;

        @Prop({required: false}) multipleSelection: Array<any>;

        private tableData: Array<any> = [];

        private tableConfig: TableConfig = {
            totalElements: 0,
            currentPage: 1,
            sort: {
                sortField: '',
                sortDirection: SortDirection.NONE
            }
        };

        private rowSelection: Array<any> = [];
        private loading: boolean = false;

        constructor() {
            super();
            this.tableConfig.currentPage = this.currentPage;
        }

        updateSelection(val: any[]) {
            this.rowSelection = val;
            this.$emit(Events.Multiple_Selection);
        }

        public reload(): void {
            this.getData();
        }

        public toPage(page: number): void {
            this.tableConfig.currentPage = page;
            // get table data with new currentPage
            this.getData();
        }

        mounted() {
            this.renderTable();
            let triggerScroll: string = null;

            this.$nextTick(() => {
                const tableEl: HTMLElement = this.$el.querySelector('.el-table__body-wrapper');
                const element: HTMLElement = this.$el.querySelector('.el-table__body');

                if (this.$el.querySelector('.is-scrolling-none') == null) {
                    // tạo và gán sự kiện scroll cho thanh scroll ngang bên trên
                    let tableHeader: HTMLElement = this.$el.querySelector('.el-table__header');
                    let table: HTMLElement = this.$el.querySelector('.el-table');

                    const fullWidth =
                            tableHeader.offsetWidth != 0
                                    ? tableHeader.offsetWidth + 'px'
                                    : tableHeader.style.width;

                    const tableWidth =
                            table.offsetWidth != 0 ? table.offsetWidth + 'px' : table.style.width;

                    let scrollBar: HTMLElement = this.$el.querySelector('.scroll-bar');
                    let scrollWrapper: HTMLElement = this.$el.querySelector('.scroll-wrapper');

                    scrollBar.style.width = fullWidth;
                    scrollWrapper.style.width = tableWidth;

                    scrollWrapper.addEventListener('scroll', event => {
                        // prevent infinite trigger scroll
                        if (triggerScroll != 'table') {
                            triggerScroll = 'top';
                            this.scrollTable((<Element> event.currentTarget).scrollLeft);
                        } else {
                            triggerScroll = null;
                        }
                    });

                    tableEl.addEventListener('scroll', (event: Event) => {
                        // prevent infinite trigger scroll
                        if (triggerScroll != 'top') {
                            triggerScroll = 'table';
                            this.scrollTop((<Element> event.currentTarget).scrollLeft);
                        } else {
                            triggerScroll = null;
                        }
                    });
                } else if (this.$el.querySelectorAll('.is-scrolling-none').length !== 0) {
                    // nếu ko cần scroll ngang => ẩn scroll ngang bên trên
                    let scrollBar: HTMLElement = this.$el.querySelector('.scroll-bar');
                    let scrollWrapper: HTMLElement = this.$el.querySelector('.scroll-wrapper');

                    scrollBar.style.height = 0 + 'px';
                    scrollWrapper.style.height = 0 + 'px';
                }

                // gắn sự kiện scroll ngang, dọc bằng giữ và kéo chuột
                let isDown = false;
                let startX: number,
                        scrollLeft = 0,
                        startY: number,
                        scrollTop = 0;
                element.addEventListener('mousedown', e => {
                    isDown = true;
                    element.classList.add('active');
                    startX = e.pageX - element.offsetLeft;
                    startY = e.pageY - element.offsetTop;
                    scrollLeft = tableEl.scrollLeft;
                    scrollTop = tableEl.scrollTop;
                });
                let moveListener = (e: any) => {
                    if (!isDown) {
                        return;
                    }
                    e.preventDefault();
                    const x = e.pageX - element.offsetLeft;
                    const y = e.pageY - element.offsetTop;
                    const walkX = (x - startX) * 3;
                    const walkY = (y - startY) * 3;
                    if (walkX !== 0) {
                        tableEl.scrollLeft = scrollLeft - walkX;
                    }
                    if (walkY !== 0) {
                        tableEl.scrollTop = scrollTop - walkY;
                    }
                };
                element.addEventListener('mousemove', moveListener);
                let upListener = () => {
                    isDown = false;
                    element.classList.remove('active');
                };
                element.addEventListener('mouseup', upListener);
                element.addEventListener('mouseleave', upListener);
            });
        }

        /**
         * When change page size, table will load first page data automatically.
         **/
        @Watch('pageSize')
        pageSizeChanged() {
            console.log('Chang pageSize : ', this.pageSize);
            this.tableConfig.currentPage = 1;
            this.renderTable();
        }

        @Watch('filterRequest', {deep: true})
        filterRequestChanged() {
            console.log('change filterRequest: ', this.filterRequest);
            this.renderTable();
        }

        @Watch('data', {deep: true})
        dataChanged() {
            this.renderTable();
        }

        @Emit('update:multipleSelection')
        public handleSelectionChange(val: any[]) {
            this.rowSelection = val;
            // this.updateSelection(val);
        }

        private scrollTop(val: number): void {
            this.$el.querySelector('.scroll-wrapper').scrollLeft = val;
        }

        private scrollTable(val: number): void {
            this.$el.querySelector('.el-table__body-wrapper').scrollLeft = val;
        }

        /* render data table */
        private renderTable(): void {
            if (this.serverPagination) {
                this.getData();
            } else {
                if (!this.nonePagination) {
                    const startIndex = (this.tableConfig.currentPage - 1) * this.pageSize;
                    const endIndex = this.tableConfig.currentPage * this.pageSize;
                    if (this.data.length - 1 >= startIndex) {
                        let temp = this.data;
                        if (this.filterMethod) {
                            temp = this.filterMethod(temp, this.filterRequest);
                        }
                        if (this.sortMethod) {
                            temp = this.sortMethod(temp, this.tableConfig.sort);
                        }
                        this.tableData = temp.slice(startIndex, endIndex);
                    }
                } else {
                    this.tableData = this.data;
                }
            }
        }

        /* get data using getDataTableFn */
        private async getData() {
            let pageRequest: PageRequest = {
                page: this.tableConfig.currentPage - 1,
                size: this.pageSize
            };

            this.loading = true;
            try {
                const response = await this.getTableDataFn(
                        pageRequest,
                        this.tableConfig.sort,
                        this.filterRequest
                );
                this.tableData = response.content;
                this.tableConfig.totalElements = response.totalElements;
            } catch (e) {
                console.error(e);
                AlertService.error(String(i18n.t('common.alertTitle.failed')), e, 1000);
            } finally {
                this.loading = false;
            }
        }

        /* handler for event change sort option of element ui table. */
        private onSortChange(sort: { order: ''; prop: '' }) {
            console.log('DataTable change sort option ', sort);
            if (sort.order) {
                this.tableConfig.sort.sortField = sort.prop;
                this.tableConfig.sort.sortDirection =
                        sort.order == 'ascending' ? SortDirection.ASC : SortDirection.DESC;
            } else {
                this.tableConfig.sort.sortField = null;
            }

            // get table data with new sort change.
            if (!this.clientSort) {
                this.getData();
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .scroll-wrapper {
        border: none 0px RED;
        overflow-x: scroll;
        overflow-y: hidden;
        width: auto;
        height: auto;

        .scroll-bar {
            height: 10px;
        }
    }

    /deep/ .el-table {
        max-height: 950px !important;
        height: auto !important;

        th {
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 0px;
            color: #a3a6b4;
            opacity: 1;
            background: #f6f6f6 0% 0% no-repeat padding-box;
        }

        td div {
            font-size: 16px;
            letter-spacing: 0px;
            color: #4d4f5c;
        }

        .el-table__body-wrapper {
            max-height: 850px !important;
            height: auto !important;
        }

        .el-table__body {
            font-size: 16px;
        }

        .el-table__body .el-link {
            font-size: 16px !important;
        }

        .el-table__body.active {
            cursor: grabbing;
        }

        .el-table__header-wrapper {
            thead th {
                background-color: #F6F6F6;
            }
        }
    }

    @media only screen and (max-width: 500px) {
        /deep/ .number {
            min-width: 18px !important;
        }
    }

    /deep/ .el-dialog__footer {
        text-align: center;
    }

    /deep/ .el-pager li {
        margin-left: 16px;
        margin-right: 16px;
        height: 44px;
        width: 80px;
        padding-top: 9px;
    }

    /deep/ .el-pagination button {
        height: 44px;
    }

    /deep/ .el-pagination .btn-prev {
        background-color: white !important;
        margin-right: 30px !important;
        color: #409EFF !important;
    }

    /deep/ .el-pagination .btn-next {
        background-color: white !important;
        margin-left: 30px !important;
        color: #409EFF !important;
    }

    /deep/ .el-pagination .el-pager .number {
        border-radius: .25rem;
        background-color: transparent;
        border: 1px solid #409EFF;
        color: #409EFF;
    }

    /deep/ .el-pagination .el-pager .number.active {
        background-color: #409EFF !important;
    }


</style>
