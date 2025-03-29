const express = require('express');
const app = express();
const port = 5000;

// 允许跨域
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// 调用AI工作流的API
app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    // 这里调用你的AI工作流
    // const result = await callYourAIWorkflow(prompt);
    res.json({ imageUrl: 'https://example.com/generated-image.png' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});