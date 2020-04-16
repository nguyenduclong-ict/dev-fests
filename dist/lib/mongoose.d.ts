import { Model, Document } from 'mongoose';
import { GetOneFunction, GetManyFunction, CreateManyFunction, UpdateOneFunction, UpdateManyFunction, DeleteOneFunction, DeleteManyFunction, CreateOneFunction } from './mogoose.declare';
export declare class Provider {
    model: Model<Document, {}>;
    constructor(model: Model<Document, {}>);
    getOne: GetOneFunction;
    getMany: GetManyFunction;
    createOne: CreateOneFunction;
    createMany: CreateManyFunction;
    updateOne: UpdateOneFunction;
    updateMany: UpdateManyFunction;
    deleteOne: DeleteOneFunction;
    deleteMany: DeleteManyFunction;
}
export declare function getOne(model: Model<Document, {}>): (condition: any, populates?: string[]) => Promise<Pick<Document, "_id">>;
export declare function getMany(model: Model<Document, {}>): (condition: any, options: GetManyOptions) => Promise<Pick<Document, "_id">[] | {
    data: Pick<Document, "_id">[];
    pager: {
        page: number;
        total: number;
        pageSize: number;
        totalPage: number;
    };
}>;
interface GetManyOptions {
    page?: number;
    limit?: number;
    populates?: string[];
    pagination?: boolean;
}
export declare function updateOne(model: Model<Document, {}>): (condition: any, data: any, options?: any) => import("mongoose").DocumentQuery<Document, Document, {}>;
export declare function updateMany(model: Model<Document, {}>): (condition: any, data: any, options?: any) => import("mongoose").Query<any>;
export declare function createOne(model: Model<Document, {}>): (doc: any, mode?: "save" | "create") => Promise<Document>;
export declare function createMany(model: Model<Document, {}>): (docs: any) => Promise<Document>;
export declare function deleteOne(model: Model<Document, {}>): (condition: any) => import("mongoose").Query<{
    ok?: number;
    n?: number;
} & {
    deletedCount?: number;
}>;
export declare function deleteMany(model: Model<Document, {}>): (condition: any) => import("mongoose").Query<{
    ok?: number;
    n?: number;
} & {
    deletedCount?: number;
}>;
export {};
