import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { StatusCodeEnum } from "../types/response";
import response from "../utils/response";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

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

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

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
