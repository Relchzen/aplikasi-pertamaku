import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,

}));

const connection = new sqlite3.Database('./db/aplikasi.db');

app.get('/api/user/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.get(query, [req.params.id], (error, row) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

app.post('/api/user/:id/change-email',
 (req, res) => {
    const newEmail = req.body.email;
    const query = 'UPDATE users SET email = ? WHERE id = ?';

    connection.run(query, [newEmail, req.params.id], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error:
 'User not found' });
        } else {
            res.status(200).json({ message: 'Email updated successfully' });
        }
    });
});

app.get('/api/file', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files',
 req.query.name);

    // Validate the file name to prevent unauthorized access
    const allowedExtensions = ['jpg', 'png', 'pdf'];
    const fileExtension = path.extname(filePath).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        res.status(400).json({ error: 'Invalid file type' });
        return;
    }

    res.sendFile(filePath);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});