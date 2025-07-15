import db from "../config/database";
import response from "../utils/response";
import { StatusCodeEnum } from "../types/response";
import { Request, Response } from "express";
import { createTimerLogsTableUtil } from "../migrations/timerLogMigration";

export const createTimerLogsTable = async (_req: Request, res: Response) => {
  try {
    const result = await db.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'timer_logs'
      ) AS exists;`
    );
    if (result.rows[0]?.exists) {
      return res.status(StatusCodeEnum.SUCCESS).json(
        response({
          success: true,
          status_code: StatusCodeEnum.SUCCESS,
          message: "Table Already Exists",
        })
      );
    }

    createTimerLogsTableUtil(db);

    return res.status(StatusCodeEnum.CREATED).json(
      response({
        success: true,
        status_code: StatusCodeEnum.CREATED,
        message: "Table Created Successfully",
      })
    );
  } catch (error) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
      response({
        success: false,
        status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: "Error Creating Table",
      })
    );
  }
};

export const getDatabaseStatus = async (_req: Request, res: Response) => {
  try {
    await db.query("SELECT 1");
    return res.status(StatusCodeEnum.SUCCESS).json(
      response({
        success: true,
        status_code: StatusCodeEnum.SUCCESS,
        message: "Database Connection is Healthy",
      })
    );
  } catch (err) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
      response({
        success: false,
        status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: "Database Connection Failed",
      })
    );
  }
};
