import { Pool } from "pg";

export async function createTimerLogsTableUtil(db: Pool): Promise<void> {
  await db.query(`
    CREATE TABLE timer_logs (
      id SERIAL PRIMARY KEY,
      start_time TIMESTAMP NOT NULL,
      end_time TIMESTAMP
    )
  `);
}
