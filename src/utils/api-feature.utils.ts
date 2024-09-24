// import { type } from "os"

// type SortOrderType = "ASC" | "DESC"
// declare interface FilterOptionsInterface {
//     table: string,
//     page?: number,
//     limit?: number,
//     sort?: string,
//     sortOrder?: SortOrderType,
//     fields?: string[]
//     filter?: Record<string,any>
// }
// export class ApiFeature{
//     #_queryString: string | null = null
//     #_filterOptions: FilterOptionsInterface
//     constructor(tableName: string){
//         this.#_filterOptions = {
//             table: tableName,
//             page: 1,
//             limit: 10,
//             sort: "id",
//             sortOrder: "ASC",
//             fields:["*"],
//             filter: {}
//         }
//     }
//     paginate(){
//         if (this.#_filterOptions.page && this.#_filterOptions.limit) {
//             const offset = (this.#_filterOptions.page - 1) * this.#_filterOptions.limit;
//             return `LIMIT ${this.#_filterOptions.limit} OFFSET ${offset}`;
//         }
//         return '?';

//     }

//     filter(){}

//     limitFields(){}

//     sort(){}

//     getQuery(): string{
//         const selectedFields = this.limitFields();
//         const tableName = this.#_filterOptions.table;
//         const filters = this.filter();
//         const sorting = this.sort();
//         const pagination = this.paginate();

//         this.#_queryString = `SELECT ${selectedFields} FROM ${tableName} ${filters} ${sorting} ${pagination}`;
        
//         return this.#_queryString;
//     }


// }
type SortOrderType = "ASC" | "DESC";

export interface FilterOptionsInterface {
    table: string;
    page?: number;
    limit?: number;
    sort?: string;
    sortOrder?: SortOrderType;
    fields?: string[];
    filter?: Record<string, any>;
}

export class ApiFeature {
    private _queryString: string | null = null; 
    private _filterOptions: FilterOptionsInterface; 

    constructor(tableName: string) {
        // Default qiymatlar
        this._filterOptions = {
            table: tableName,
            page: 1,
            limit: 10,
            sort: "id",
            sortOrder: "ASC",
            fields: ["*"],
            filter: {},
        };
    }

    // Paginatsiya
    paginate() {
        if (this._filterOptions.page && this._filterOptions.limit) {
            const offset = (this._filterOptions.page - 1) * this._filterOptions.limit;
            return `LIMIT ${this._filterOptions.limit} OFFSET ${offset}`;
        }
        return '';
    }

    // Filterlash
    filter() {
        const filters = this._filterOptions.filter;
        const filterStrings = Object.entries(filters).map(
            ([key, value]) => `${key}='${value}'`
        );
        return filterStrings.length ? `WHERE ${filterStrings.join(' AND ')}` : '';
    }

    // Fieldlarni tanlash
    limitFields() {
        if (this._filterOptions.fields && this._filterOptions.fields.length > 0) {
            return this._filterOptions.fields.join(', ');
        }
        return '*';
    }

    // Sortlash
    sort() {
        if (this._filterOptions.sort) {
            return `ORDER BY ${this._filterOptions.sort} ${this._filterOptions.sortOrder}`;
        }
        return '';
    }

    // Query so'rovini yaratish
    getQuery(): string {
        const selectedFields = this.limitFields(); // No parameter passed here
        const tableName = this._filterOptions.table;
        const filters = this.filter();
        const sorting = this.sort();
        const pagination = this.paginate();

        this._queryString = `SELECT ${selectedFields} FROM ${tableName} ${filters} ${sorting} ${pagination}`;
        
        return this._queryString;
    }
}
