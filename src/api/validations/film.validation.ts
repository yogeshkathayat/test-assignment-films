
import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import { FilmValidationSchema } from "../../api/models/film.model";

const fileName = "[user.validation.js]";

const validateFilm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const methodName = "[validateFilm]";
    const { error} = FilmValidationSchema.validate(req.body);

    if (!error) return next();

    logger.error(`${fileName} ${methodName} Validation Error ${error}`);

    return ResponseHandler.setResponse(
        res,
        false,
        HttpStatus.BAD_REQUEST,
        errorMessage.FAILED,
        version.v1,
        {
            error: "Bad Request"
        }
    );
};


export default validateFilm;