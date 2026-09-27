const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

router.use(express.json());

router.get('/status', (req, res) => {
  res.json({
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', router);

const STATIC_DIR = process.env.STATIC_DIR || path.join(__dirname, 'projects');
app.use('/projects', express.static(STATIC_DIR));

app.get('/projects/*', (req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'index.html'));
});
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));