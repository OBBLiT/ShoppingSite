const express = require('express');
const app = express();
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello there. Hope you doing well' });
});
app.post('/admlog', (req, res) => {
  res.json({ message: 'Login-Dummy' });
});
app.post('/admadditems', (req, res) => {
  res.json({ message: 'success' });
});
app.post('/getItems', (req, res) => {
  const data = {};
  res.json(data);
});
app.post('/getItemsFree', (req, res) => {
  const data = {};
  res.json(data);
});
const PORT = 3001;

app.listen(PORT, () => {
  console.log('Connected at port: 3001');
});
