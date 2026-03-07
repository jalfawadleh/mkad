import mongoose from "mongoose";

const requireDbReady = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
    return;
  }

  res.status(503).json({
    message: "Database is not connected. Please try again shortly.",
  });
};

export { requireDbReady };
