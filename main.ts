const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.json());

const DATE_FILE = path.join(__dirname, 'date.txt');

// Initialize file if it doesn't exist
if (!fs.existsSync(DATE_FILE)) {
  fs.writeFileSync(DATE_FILE, Date.now().toString());
}

app.post('/date', (req: any, res: any) => {
  try {
    const currentDate = Date.now();
    fs.writeFileSync(DATE_FILE, currentDate.toString());
    res.json({ success: true, date: currentDate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update date' });
  }
});

app.get('/date', (req: any, res: any) => {
  try {
    const date = fs.readFileSync(DATE_FILE, 'utf8');
    res.json({ date: parseInt(date) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read date' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
