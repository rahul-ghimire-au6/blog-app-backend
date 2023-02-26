import { Response } from 'express'

const handleError = (res: Response, err: Error, statusCode: number = 400) => {
    // console.log(`error name => ${err.name}`);
    // console.log(`error message => ${err.message}`);
    return res.status(statusCode).json({
        success: false,
        errName: err.name,
        errMessage: err.message,
    });
};

export default handleError;