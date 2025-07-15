import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./routes/index";
import response from "./utils/response";
import { StatusCodeEnum } from "./types/response";

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: response({
    success: false,
    status_code: StatusCodeEnum.TOO_MANY_REQUESTS,
    error: "Too many requests from this IP, please try again later.",
  }),
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/", routes);

export default app;
