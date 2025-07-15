import { Request, Response, NextFunction } from "express";
import response from "../utils/response";
import { StatusCodeEnum } from "../types/response";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodeEnum.UNAUTHORIZED).json(
      response({
        success: false,
        status_code: StatusCodeEnum.UNAUTHORIZED,
        error: "Authorization Header Missing or Malformed",
      })
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token || token !== process.env.AUTH_TOKEN) {
    return res.status(StatusCodeEnum.UNAUTHORIZED).json(
      response({
        success: false,
        status_code: StatusCodeEnum.UNAUTHORIZED,
        error: "Invalid or Missing Token",
      })
    );
  }

  return next();
}
