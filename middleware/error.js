const notFound = async (req, res, next) => {
    try {
      throw new Error(`Not Found - ${req.originalUrl}`);
    } catch (error) {
      res.status(404);
      next(error);
    }
  };
  
  const errorHandler = async (err, req, res, next) => {
    try {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { notFound, errorHandler };