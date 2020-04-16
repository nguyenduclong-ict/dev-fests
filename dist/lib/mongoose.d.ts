import { Model, Document } from 'mongoose';
export declare class Provider {
    model: Model<Document, {}>;
    constructor(model: Model<Document, {}>);
    getOne: (conditions: any, populates?: string[]) => Promise<any>;
    updateOne: (conditions: any, data: any, options?: any) => any;
}
export declare function getOne(model: Model<Document, {}>): (conditions: any, populates?: string[]) => Promise<Pick<Document, "_id">>;
export declare function updateOne(model: Model<Document, {}>): (conditions: any, data: any, options?: any) => import("mongoose").DocumentQuery<Document, Document, {}>;
