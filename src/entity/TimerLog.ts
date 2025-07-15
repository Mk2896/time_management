interface TimerLogInterface {
  id: number;
  start_time: Date;
  end_time?: Date;
}

export type TimerLog = TimerLogInterface;
