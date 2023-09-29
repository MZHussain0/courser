﻿import { app } from "./app";
require("dotenv").config();

// Create Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});