import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import startupLogger from "./utils/startup";

const PORT = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  startupLogger();
});
