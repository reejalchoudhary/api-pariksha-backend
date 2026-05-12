export default function errorHandler(err, req, res, next) {
  console.error("❌ API Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message,
    error: err.response?.data || null
  });
}
