export const errorMiddleware = (err, req, res, next) => {
  try {
    let error = {
      ...err,
      status: err.status || 500,
    };

    // Log the error to the console.
    console.error(error);

    switch (err.name) {
      case "ValidationError":
        error.message = err.errors;
        error.status = 400;
        break;
      case "CastError":
        error.message = `Resource not found with id of ${err.value}`;
        error.status = 404;
        break;
      default:
        break;
    }

    switch (err.code) {
      case 11000:
        error.message = "Duplicate field value entered";
        error.status = 400;
        break;
      default:
        break;
    }

    res.status(error.status).json({
      success: false,
      message: error.message,
    });
  } catch (error) {
    next(error);
  }
};
