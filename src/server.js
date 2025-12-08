const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.status(200).json({ healthy: true });
});

app.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        service: 'devops-assignment',
        timestamp: new Date().toISOString()
    });
});

// middleware
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found', 
        path: req.path 
    });
});

// only listen when running directly, not during tests
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
};
module.exports = app;