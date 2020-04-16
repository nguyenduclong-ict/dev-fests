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
        this.updateOne = updateOne(this.model);
    }
}
exports.Provider = Provider;
function getOne(model) {
    return function (conditions, populates = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = model.findOne(conditions);
            populates.forEach((field) => {
                task.populate(field);
            });
            return task.lean().exec();
        });
    };
}
exports.getOne = getOne;
function updateOne(model) {
    return function (conditions, data, options) {
        return model.findOneAndUpdate(conditions, data, Object.assign({ new: true, setDefaultsOnInsert: true, upsert: false }, options));
    };
}
exports.updateOne = updateOne;
//# sourceMappingURL=mongoose.js.map