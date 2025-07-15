import { Router } from "express";
import timerLogsRoutes from "./timerLogs";
import databaseRoutes from "./database";
import { StatusCodeEnum } from "../types/response";
import response from "../utils/response";
import errorHandler from "../middleware/errorHandler";
import dotenv from "dotenv";

dotenv.config();

const apiVersion = process.env.API_VERSION;

const router = Router();

// Health check endpoint
router.get("/health", (_, res) => {
  res.status(StatusCodeEnum.SUCCESS).json(
    response({
      success: true,
      status_code: StatusCodeEnum.SUCCESS,
      message: "Health check successful at " + new Date().toISOString(),
    })
  );
});

// Global error handler
router.use(errorHandler);

// Database routes
router.use("/database", databaseRoutes);

// Timmer logs routes
router.use(`${apiVersion}/timer-logs`, timerLogsRoutes);

// 404 handler
router.use("*", (_, res) => {
  res.status(StatusCodeEnum.NOT_FOUND).json(
    response({
      success: false,
      status_code: StatusCodeEnum.NOT_FOUND,
      error: "Not found",
    })
  );
});

export default router;
