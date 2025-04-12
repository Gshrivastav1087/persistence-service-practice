export const NODE_ENV = process.env.NODE_ENV || 'development';
export const USE_MOCK_DB = process.env.USE_MOCK_DB === 'true' || false;
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// Log environment configuration
console.log("Environment configuration:");
console.log(`- Environment: ${NODE_ENV}`);
console.log(`- Using mock DB: ${USE_MOCK_DB}`);
console.log(`- Port: ${PORT}`);