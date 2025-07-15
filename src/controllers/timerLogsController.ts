import { Request, Response } from "express";
import TimerLogRepository from "../repository/timerLogRepository.js";
import response from "../utils/response.js";
import { StatusCodeEnum } from "../types/response.js";
import {
  StartTimerLogInput,
  EndTimerLogInput,
  GetTimerLogsInput,
  UpdateTimerLogMinutesInput,
  IdParam,
} from "../schemas/timerLogSchema.js";

export const startTimerLog = async (
  req: Request<{}, {}, StartTimerLogInput>,
  res: Response
) => {
  try {
    const { timestamp } = req.body;
    const timerLog = await TimerLogRepository.create(req.body);
    return res.status(StatusCodeEnum.CREATED).json(
      response({
        success: true,
        status_code: StatusCodeEnum.CREATED,
        message: "Timer Log Started",
        data: { id: timerLog.id },
      })
    );
  } catch (error) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
      response({
        success: false,
        status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: "Failed to Start Timer Log",
      })
    );
  }
};

export const endTimerLog = async (
  req: Request<IdParam, {}, EndTimerLogInput>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { timestamp } = req.body;
    const result = await TimerLogRepository.updateEndTime({ id, timestamp });

    if (!result) {
      return res.status(StatusCodeEnum.NOT_FOUND).json(
        response({
          success: false,
          status_code: StatusCodeEnum.NOT_FOUND,
          error: "Timer Log Not Found or Already Ended",
        })
      );
    }

    return res.status(StatusCodeEnum.SUCCESS).json(
      response({
        success: true,
        status_code: StatusCodeEnum.SUCCESS,
        message: "Timer Log Ended",
      })
    );
  } catch (error) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
      response({
        success: false,
        status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: "Failed to End Timer Log",
      })
    );
  }
};

export const getTimerLogs = async (
  req: Request<{}, {}, GetTimerLogsInput>,
  res: Response
) => {
  try {
    const { start, end } = req.body;
    const logs = await TimerLogRepository.findAllInRange({
      start,
      end,
      orderBy: "ASC",
    });
    return res.status(StatusCodeEnum.SUCCESS).json(
      response({
        success: true,
        status_code: StatusCodeEnum.SUCCESS,
        message: "Timer Logs Fetched",
        data: logs,
      })
    );
  } catch (error) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
      response({
        success: false,
        status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: "Failed to Fetch Logs",
      })
    );
  }
};

export const updateTimerLogMinutes = async (
  req: Request<IdParam, {}, UpdateTimerLogMinutesInput>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { action, minutes } = req.body;

    const timerLog = await TimerLogRepository.updateEndTimeByMinutes({
      id,
      action,
      minutes,
    });

    if (!timerLog) {
      return res.status(StatusCodeEnum.NOT_FOUND).json(
        response({
          success: false,
          status_code: StatusCodeEnum.NOT_FOUND,
          error: "Timer Log Not Found or End Time Not Set",
        })
      );
    }

    return res.status(StatusCodeEnum.SUCCESS).json(
      response({
        success: true,
        status_code: StatusCodeEnum.SUCCESS,
        message: "Timer Log Updated",
      })
    );
  } catch (error) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
      response({
        success: false,
        status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: "Failed to Update Timer Log",
      })
    );
  }
};

export const deleteTimerLog = async (req: Request<IdParam>, res: Response) => {
  try {
    const { id } = req.params;
    const result = await TimerLogRepository.delete({ id });
    if (!result) {
      return res.status(StatusCodeEnum.NOT_FOUND).json(
        response({
          success: false,
          status_code: StatusCodeEnum.NOT_FOUND,
          error: "Timer Log Not Found",
        })
      );
    }
    return res.status(StatusCodeEnum.SUCCESS).json(
      response({
        success: true,
        status_code: StatusCodeEnum.SUCCESS,
        message: "Timer Log Deleted",
      })
    );
  } catch (error) {
    return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json(
      response({
        success: false,
        status_code: StatusCodeEnum.INTERNAL_SERVER_ERROR,
        error: "Failed to Delete Timer Log",
      })
    );
  }
};
