// src/index.js
const app = require('./app');
const db = require('./database');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Database connected.');

        await db.sequelize.sync(); // Optional: sinkronisasi model
        console.log('✅ Database synced.');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error.message);
    }
}

startServer();
