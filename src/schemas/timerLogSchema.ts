import Joi from "joi";

export const startTimerLogSchema = Joi.object({
  timestamp: Joi.date().iso().required(),
});

export type StartTimerLogInput = {
  timestamp: string;
};

export const endTimerLogSchema = Joi.object({
  timestamp: Joi.date().iso().required(),
});

export type EndTimerLogInput = {
  timestamp: string;
};

export const getTimerLogsSchema = Joi.object({
  start: Joi.date().iso().required(),
  end: Joi.date().iso().required(),
});

export type GetTimerLogsInput = {
  start: string;
  end: string;
};

export const updateTimerLogMinutesSchema = Joi.object({
  action: Joi.string().valid("add", "deduct").required(),
  minutes: Joi.number().integer().min(1).required(),
});

export type UpdateTimerLogMinutesInput = {
  action: "add" | "deduct";
  minutes: number;
};

export const idParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export type IdParam = {
  id: string;
};
