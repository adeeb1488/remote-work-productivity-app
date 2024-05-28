import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log('User is connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('User is disconnected...');
    });
});

app.post('/compile', (req, res) => {
    const { code, language } = req.body;
    let command;
    let tempFilePath;

    console.log('Received code:', code);
    console.log('Received language:', language);

    try {
        switch (language) {
            case 'javascript':
                tempFilePath = path.join(__dirname, 'temp.js');
                fs.writeFileSync(tempFilePath, code);
                command = `node "${tempFilePath}"`;
                break;
            case 'python':
                tempFilePath = path.join(__dirname, 'temp.py');
                fs.writeFileSync(tempFilePath, code);
                command = `python "${tempFilePath}"`;
                break;
            case 'cpp':
                const cppFilePath = path.join(__dirname, 'temp.cpp');
                const exeFilePath = path.join(__dirname, 'temp.out');
                fs.writeFileSync(cppFilePath, code);
                command = `g++ "${cppFilePath}" -o "${exeFilePath}" && "${exeFilePath}"`;
                break;
            default:
                return res.json({ output: 'Unsupported language' });
        }

        console.log('Executing command:', command);

        exec(command, (error, stdout, stderr) => {
            let output;
            if (error) {
                output = stderr || error.message;
            } else {
                output = stdout;
            }
            res.json({ output });

            console.log('Execution output:', output);

            // Clean up temporary files after sending the response
            if (tempFilePath && fs.existsSync(tempFilePath)) {
                fs.unlink(tempFilePath, (err) => {
                    if (err) console.error(`Error deleting ${tempFilePath}:`, err);
                });
            }
            if (language === 'cpp') {
                const exeFilePath = path.join(__dirname, 'temp.out');
                if (fs.existsSync(exeFilePath)) {
                    fs.unlink(exeFilePath, (err) => {
                        if (err) console.error(`Error deleting ${exeFilePath}:`, err);
                    });
                }
            }
        });
    } catch (err) {
        console.error('Error handling request:', err);
        res.status(500).json({ output: 'Server error: ' + err.message });
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
