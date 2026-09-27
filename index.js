const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const router = express.Router();

app.use(express.json());

router.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', router);

app.use('/projects', proxy('http://localhost:4321'));

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));