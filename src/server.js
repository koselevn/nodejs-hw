import express from "express";
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const PORT = process.env.PORT ?? 3000;

// app
const app = express();
// json
app.use(express.json());
// cors
app.use(cors());
// pino
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);


app.get("/notes", (req, res) => {
  res.status(200).json({ "message": "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({ "message": `Retrieved note with ID: ${noteId}` });

});

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log("Error:", err);

  res.status(500).json({message: err.message});
});

app.listen(PORT, () => {
  console.log(`Server is startet on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
