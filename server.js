const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Echo endpoint with Accept header validation
app.post('/echo', (req, res) => {
    const acceptHeader = req.headers['accept'];
    if (!acceptHeader) {
        return res.status(400).json({ error: 'Accept header is required' });
    }

    const message = req.body.message;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    res.set('Accept', acceptHeader);
    res.json({ echo: message });
});

// Start the server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;
