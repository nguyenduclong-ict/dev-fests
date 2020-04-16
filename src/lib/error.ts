export class FesError extends Error {
  code: number;
  data: any;

  constructor(message: string, code?: number, data?: any) {
    super();
    this.message = message;
    this.code = code || 500;
    this.data = data;
  }
}

export function handleFesError(err, req, res, next) {
  if (err instanceof FesError) {
    console.log('FesError', err);
    if (err.data) {
      return res.status(err.code).json(err.data);
    }
    return res.status(err.code).send(err.message);
  }
  res.status(err.status || 500).send(err.message);
}
