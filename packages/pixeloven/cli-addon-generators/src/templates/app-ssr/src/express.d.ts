/* tslint:disable no-namespace */
/**
 * Extend express Request
 */
declare namespace Express {
    export interface Files {
        css?: string[];
        js?: string[];
    }

    export interface Request {
        language: string;
        locale: string;
        files?: Files;
    }
}
