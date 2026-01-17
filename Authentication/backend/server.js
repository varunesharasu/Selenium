import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const app = express();
const port = 3001;
const mongoUrl = 'mongodb://localhost:27017'; // Update if your MongoDB runs elsewhere
const dbName = 'auth_demo';

app.use(cors());
app.use(express.json());

let db, users;

MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    users = db.collection('users');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
  const userExists = await users.findOne({ username });
  if (userExists) return res.status(409).json({ message: 'User already exists' });
  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({ username, password: hashedPassword });
  res.json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
  const user = await users.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful' });
});
