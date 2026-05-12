import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/request", async (req, res) => {
  const { url, method, headers, params, body } = req.body;

  const start = Date.now();

  try {
    const response = await axios({
      url,
      method,
      headers,
      params,
      data: ["GET", "HEAD"].includes(method) ? undefined : body,
      timeout: 15000,
      maxRedirects: 0,
      validateStatus: () => true
    });

    const time = Date.now() - start;
    const size = JSON.stringify(response.data || "").length;

    res.json({
      success: response.status < 400,
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
      responseTime: time,
      responseSize: size
    });
  } catch (err) {
    const time = Date.now() - start;

    res.json({
      success: false,
      status: err.response?.status || 0,
      statusText:
        err.response?.statusText ||
        (err.code === "ENOTFOUND"
          ? "DNS Not Found"
          : err.code === "ECONNABORTED"
          ? "Timeout"
          : "Network Error"),
      data: { message: err.message },
      responseTime: time,
      responseSize: 0
    });
  }
});

export default router;
