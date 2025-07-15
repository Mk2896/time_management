import { Response, StatusCode } from "../types/response.js";

/**
 * Response utility
 */
const response = <T>({
  success,
  status_code,
  data,
  message,
  error,
}: {
  success: boolean;
  status_code: StatusCode;
  data?: T;
  message?: string;
  error?: string;
}): Response<T> => {
  if (success) {
    return {
      success,
      status_code,
      message: message || "Message Not Provided",
      data: data || [],
    };
  }

  return {
    success,
    status_code,
    error: error || "Error Not Provided",
    data: data || [],
  };
};

export default response;
