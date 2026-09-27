const app = require('./app');
const connectDB = require('./config/db');

const PORT = Number(process.env.PORT) || 5001;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the other process or change PORT in the .env file.`);
      } else {
        console.error('Server failed to start:', error.message);
      }
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error('Database connection failed. Express server aborted:', error.message);
    process.exit(1);
  });
