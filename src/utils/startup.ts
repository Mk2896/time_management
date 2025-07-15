/**
 * Server startup logging utility
 */
const startupLogger = (): void => {
  const port = process.env.PORT || "3000";
  const version = process.env.VERSION || "v1";
  const env = process.env.NODE_ENV || "development";
  const startedAt = new Date().toISOString();

  console.log(`🚀 Time Management API server running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🔗 API Base URL: http://localhost:${port}/${version}`);
  console.log(`🌍 Environment: ${env}`);
  console.log(`⏰ Started at: ${startedAt}`);
};

export default startupLogger;
