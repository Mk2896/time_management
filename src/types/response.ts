/**
 * Status code enum
 */
export enum StatusCodeEnum {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * Status code type
 */
export type StatusCode = StatusCodeEnum;

/**
 * Base response required fields
 */
interface ResponseRequired {
  success: boolean;
  status_code: StatusCode;
}

/**
 * Response type for successful requests
 */
interface ResponseSuccess<T> extends ResponseRequired {
  success: true;
  message: string;
  data: T | [];
}

/**
 * Response type for error requests
 */
interface ResponseError<T> extends ResponseRequired {
  success: false;
  error: string;
  data: T | [];
}

/**
 * Response type for requests
 * @template T - The type of the data in the response
 * @returns {{
 *   success: boolean,
 *   status_code: number,
 *   message?: string,
 *   error?: string,
 *   data?: T | []
 * }} - The response object
 *
 * @example
 * // Success response
 * {
 *   success: true,
 *   status_code: 200,
 *   message: "Data retrieved successfully",
 *   data: { id: 1, name: "John" }
 * }
 *
 * @example
 * // Error response
 * {
 *   success: false,
 *   status_code: 400,
 *   error: "Invalid input provided"
 *   data: []
 * }
 */
export type Response<T> = ResponseSuccess<T> | ResponseError<T>;
