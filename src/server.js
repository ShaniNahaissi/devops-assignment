const { timeStamp } = require('console');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        service: 'devops-assignment',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});