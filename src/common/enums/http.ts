export const enum StatusCode {
  Unauthorized = 401,
  Success = 200,
  Forbidden = 403,
  TooManyRequests = 429,
  BadRequest = 400,
  InternalServerError = 500,
}

export const enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}
