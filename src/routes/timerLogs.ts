import { Router } from "express";
import authMiddleware from "../middleware/auth";
import {
  startTimerLog,
  endTimerLog,
  getTimerLogs,
  updateTimerLogMinutes,
  deleteTimerLog,
} from "../controllers/timerLogsController";
import { validateRequest, validateParams } from "../middleware/validation";
import {
  startTimerLogSchema,
  endTimerLogSchema,
  getTimerLogsSchema,
  updateTimerLogMinutesSchema,
  idParamSchema,
} from "../schemas/timerLogSchema";

const router = Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

router.post("/start", validateRequest(startTimerLogSchema), startTimerLog);
router.put(
  "/:id/end",
  validateParams(idParamSchema),
  validateRequest(endTimerLogSchema),
  endTimerLog
);
router.get("/", validateRequest(getTimerLogsSchema), getTimerLogs);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateRequest(updateTimerLogMinutesSchema),
  updateTimerLogMinutes
);
router.delete("/:id", validateParams(idParamSchema), deleteTimerLog);

export default router;
