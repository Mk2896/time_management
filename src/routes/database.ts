import { Router } from "express";
import {
  createTimerLogsTable,
  getDatabaseStatus,
} from "../controllers/databaseController.js";

const router = Router();

router.get("/status", getDatabaseStatus);
router.get("/init", createTimerLogsTable);

export default router;
