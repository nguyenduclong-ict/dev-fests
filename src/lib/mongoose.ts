import { Model, Document } from 'mongoose';

export class Provider {
  model: Model<Document, {}>;

  constructor(model: Model<Document, {}>) {
    this.model = model;
    this.getOne = getOne(this.model);
    this.updateOne = updateOne(this.model);
  }

  getOne: (conditions, populates?: string[]) => Promise<any>;
  updateOne: (conditions, data, options?) => any;
}

export function getOne(model: Model<Document, {}>) {
  return async function (conditions, populates: string[] = []) {
    const task = model.findOne(conditions);
    populates.forEach((field) => {
      task.populate(field);
    });
    return task.lean().exec();
  };
}

export function updateOne(model: Model<Document, {}>) {
  return function (conditions, data, options?) {
    return model.findOneAndUpdate(conditions, data, {
      new: true,
      setDefaultsOnInsert: true,
      upsert: false,
      ...options,
    });
  };
}
