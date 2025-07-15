import { StatusCodeEnum } from "../types/response";
import response from "../utils/response";

/**
 * Global error handler middleware
 */
const errorHandler = (err: any, _: any, res: any, __: any) => {
  res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
    response({
      success: false,
      status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
      error: err.message || "Internal Server Error",
    })
  );
};

export default errorHandler;
