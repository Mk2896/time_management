import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import startupLogger from "./utils/startup.js";

const PORT = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  startupLogger();
});
