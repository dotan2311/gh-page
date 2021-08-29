<template>
    <div>
        <label>Test DataTable</label>
        aaaa
        <data-table :getTableDataFn="getTodo" :pageSize="5">
            <el-table-column label="ID" prop="id"/>
            <el-table-column label="Name" prop="name"/>
            <el-table-column label="Age" prop="age"/>
        </data-table>
    </div>
</template>


<script lang='ts'>
    import DataTable from '@/components/datatable/DataTable.vue';
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {DataTable}
    })
    export default class DataTableExample extends Vue {
        private abc: string = null;

        mounted() {
            console.log('render DataTable Example');
        }

        getTodo(): Promise<any> {
            return new Promise(function(resolve, reject) {
                resolve({
                    totalElements: 10,
                    content: [
                        {id: 1, name: 'dat', age: 25},
                        {id: 2, name: 'hoang', age: 23},
                        {id: 3, name: 'vo', age: 25},
                        {id: 4, name: 'kien', age: 30},
                        {id: 5, name: 'manh', age: 27}
                    ]
                });
            });
        }
    }
</script>

<style lang="scss" scoped>
    .about {
        text-align: center;
    }
</style>
