const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const code =
    err.code ||
    {
      400: "bad_request",
      401: "unauthorized",
      403: "forbidden",
      404: "not_found",
      409: "conflict",
      429: "rate_limited",
      500: "internal_error",
      503: "service_unavailable",
    }[statusCode] ||
    "internal_error";

  res.status(statusCode);

  res.json({
    message: err.message,
    code,
    requestId: req.requestId,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const printRequest = (err, req, res, next) => {
  // if (process.env.NODE_ENV === "development") console.log(req.body);
  console.log(err);
  console.log(req);
  console.log(res);
  next();
};

export { notFound, errorHandler, printRequest };
