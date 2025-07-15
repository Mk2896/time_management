import db from "../config/database";
import { TimerLog } from "../entity/TimerLog";
import {
  StartTimerLogInput,
  EndTimerLogInput,
  GetTimerLogsInput,
  UpdateTimerLogMinutesInput,
  IdParam,
} from "../schemas/timerLogSchema";

class TimerLogRepository {
  async create({ timestamp }: StartTimerLogInput): Promise<TimerLog> {
    const result = await db.query(
      `INSERT INTO timer_logs (start_time) VALUES ($1) RETURNING *`,
      [timestamp]
    );
    return result.rows[0] as TimerLog;
  }

  async updateEndTime({
    id,
    timestamp,
  }: IdParam & EndTimerLogInput): Promise<TimerLog | undefined> {
    const result = await db.query(
      `UPDATE timer_logs SET end_time = $1 WHERE id = $2 and end_time IS NULL RETURNING *`,
      [timestamp, Number(id)]
    );
    return result.rows[0] as TimerLog | undefined;
  }

  async findAllInRange({
    start,
    end,
    orderBy,
  }: GetTimerLogsInput & { orderBy: "ASC" | "DESC" }): Promise<TimerLog[]> {
    const result = await db.query(
      `SELECT * FROM timer_logs WHERE start_time >= $1 AND end_time <= $2 ORDER BY start_time ${orderBy}`,
      [start, end]
    );
    return result.rows as TimerLog[];
  }

  async updateEndTimeByMinutes({
    id,
    action,
    minutes,
  }: IdParam & UpdateTimerLogMinutesInput): Promise<TimerLog | undefined> {
    const op = action === "add" ? "+" : "-";
    const result = await db.query(
      `UPDATE timer_logs SET end_time = end_time ${op} INTERVAL '${minutes} minutes' WHERE id = $1 RETURNING *`,
      [Number(id)]
    );
    return result.rows[0] as TimerLog | undefined;
  }

  async delete({ id }: IdParam): Promise<TimerLog | undefined> {
    const result = await db.query(
      `DELETE FROM timer_logs WHERE id = $1 RETURNING *`,
      [Number(id)]
    );
    return result.rows[0] as TimerLog | undefined;
  }
}

export default new TimerLogRepository();
