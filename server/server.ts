import { app } from "./app";
import connectDB from "./uttils/db";
require("dotenv").config();

// Create Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  connectDB();
});
