export default interface IDataTable {
    reload(): void;

    toPage(page: number): void;
}
