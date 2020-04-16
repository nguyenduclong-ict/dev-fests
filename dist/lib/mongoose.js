"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Provider {
    constructor(model) {
        this.model = model;
        this.getOne = getOne(this.model);
        this.getMany = getMany(this.model);
        this.createOne = createOne(this.model);
        this.createMany = createMany(this.model);
        this.updateOne = updateOne(this.model);
        this.updateMany = updateMany(this.model);
        this.deleteOne = deleteOne(this.model);
        this.deleteMany = deleteMany(this.model);
    }
}
exports.Provider = Provider;
// function ----------------------------------------------------
function getOne(model) {
    return (condition, populates = []) => {
        const task = model.findOne(condition);
        populates.forEach((field) => {
            task.populate(field);
        });
        return task.lean().exec();
    };
}
exports.getOne = getOne;
function getMany(model) {
    return (condition, options) => __awaiter(this, void 0, void 0, function* () {
        const defaultOptions = {
            populates: [],
            pagination: true,
            page: 0,
            limit: 10,
        };
        options = Object.assign(Object.assign({}, defaultOptions), options);
        const { page, pagination, limit, populates } = options;
        if (pagination) {
            // skip and limit
            const task = model
                .find(condition)
                .skip(limit * page)
                .limit(limit);
            // populates
            populates.forEach((field) => {
                task.populate(field);
            });
            const [list, count] = yield Promise.all([
                task.lean().exec(),
                model.countDocuments(condition),
            ]);
            // pager
            const pager = {
                page,
                total: count,
                pageSize: limit,
                totalPage: Math.ceil(count / limit),
            };
            return { data: list || [], pager };
        }
        else {
            // No pagination
            const task = model.find(condition);
            // skip and limt
            if (isNaN(page))
                task.skip(page * limit);
            if (isNaN(limit))
                task.limit(limit);
            // populates
            populates.forEach((field) => {
                task.populate(field);
            });
            return task.lean().exec();
        }
    });
}
exports.getMany = getMany;
function updateOne(model) {
    return (condition, data, options) => {
        return model.findOneAndUpdate(condition, data, Object.assign({ new: true, setDefaultsOnInsert: true, upsert: false }, (options || {})));
    };
}
exports.updateOne = updateOne;
function updateMany(model) {
    return (condition, data, options) => {
        return model.updateMany(condition, data, Object.assign({ upsert: true, setDefaultsOnInsert: true, new: true }, (options || {})));
    };
}
exports.updateMany = updateMany;
function createOne(model) {
    return (doc, mode = 'save') => {
        if (mode === 'create') {
            return model.create(doc);
        }
        else if (mode === 'save') {
            return new model(doc).save();
        }
    };
}
exports.createOne = createOne;
function createMany(model) {
    return (docs) => {
        return model.insertMany(docs);
    };
}
exports.createMany = createMany;
function deleteOne(model) {
    return (condition) => {
        return model.deleteOne(condition);
    };
}
exports.deleteOne = deleteOne;
function deleteMany(model) {
    return (condition) => {
        return model.deleteMany(condition);
    };
}
exports.deleteMany = deleteMany;
//# sourceMappingURL=mongoose.js.map