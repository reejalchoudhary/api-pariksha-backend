import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import apiRoutes from "./routes/api.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "5mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.use("/api", apiRoutes);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 API Pariksha backend running on http://localhost:${PORT}`)
);
