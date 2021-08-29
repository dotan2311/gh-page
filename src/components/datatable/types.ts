export enum SortDirection {
    NONE = '',
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface PageRequest {
    page: number;
    size: number;
}

export interface TableConfig {
    currentPage: number;
    totalElements: number;
    sort: Sort;
}

export interface DraggableTableConfig {
    orderColumn: string;
    onEndDrag: Function;
    dragIconClass: string;
}

export interface Sort {
    sortField: string;
    sortDirection: SortDirection;
}

export interface GetTableDataFnResponse {
    content: Array<any>;
    totalElements: number;
}

export type getTableDataFn = (
    pageRequest: PageRequest,
    sort: Sort,
    filterRequest: any
) => Promise<GetTableDataFnResponse>;

export type sortMethod = (tableData: Array<any>, sort: Sort) => Array<any>;
export type filterMethod = (tableData: Array<any>, filterRequest: any) => Array<any>;

//cua dat
export interface Utilities {
    hasParking: boolean;
    hasSanitization: boolean;
    hasTransportation: boolean;
}

export interface RoomUtilities {
    hasWifi: boolean;
    hasAirConditioner: boolean;
    hasWashingMachine: boolean;
    hasFridge: boolean;
    hasStove: boolean;
    hasWardrobe: boolean;
    asBalcony: boolean;
    deleted: boolean;
}
export interface floors{
    id:string,
    name:string
}

export interface location{
    lng:number,
    lat:number
}





