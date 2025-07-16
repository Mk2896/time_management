import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import {
  startTimerLog,
  endTimerLog,
  getTimerLogs,
  updateTimerLogMinutes,
  deleteTimerLog,
} from "../controllers/timerLogsController.js";
import { validate } from "../middleware/validation.js";
import {
  startTimerLogSchema,
  endTimerLogSchema,
  getTimerLogsSchema,
  updateTimerLogMinutesSchema,
  idParamSchema,
} from "../schemas/timerLogSchema.js";
import { Request } from "../types/request.js";

const router = Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

router.post("/start", validate(startTimerLogSchema), startTimerLog);
router.put(
  "/:id/end",
  validate(idParamSchema, Request.PARAMS),
  validate(endTimerLogSchema),
  endTimerLog
);
router.get("/", validate(getTimerLogsSchema, Request.QUERY), getTimerLogs);
router.put(
  "/:id",
  validate(idParamSchema, Request.PARAMS),
  validate(updateTimerLogMinutesSchema),
  updateTimerLogMinutes
);
router.delete("/:id", validate(idParamSchema, Request.PARAMS), deleteTimerLog);

export default router;
