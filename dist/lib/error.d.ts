export declare class FesError extends Error {
    code: number;
    data: any;
    constructor(message: string, code?: number, data?: any);
}
export declare function handleFesError(err: any, req: any, res: any, next: any): any;
