import { NextFunction, Request, Response } from 'express';

const errors: any = {
    ValidationError: 406,
    ReferenceError: 404,
    URIError: 400,
    UserError: 404,
    UserAuthorizationError: 401,
    TokenError: 401,
};

export const errorControl = (
    error: Error,
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    req;
    next;
    let status;
    if (error.name) status = errors[error.name];

    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.end(JSON.stringify(result));
};
