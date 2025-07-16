import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { StatusCodeEnum } from "../types/response.js";
import response from "../utils/response.js";
import { Request as RequestEnum, RequestTypes } from "../types/request.js";

export const validate = (
  schema: Joi.ObjectSchema,
  requestType: RequestTypes = RequestEnum.BODY
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[requestType]);

    if (error) {
      return res.status(StatusCodeEnum.BAD_REQUEST).json(
        response({
          success: false,
          status_code: StatusCodeEnum.BAD_REQUEST,
          error: "Validation Error",
          data: error.details.map((detail) => detail.message).join(" , "),
        })
      );
    }

    return next();
  };
};
