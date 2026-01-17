import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRoutes from "./routes/notesRoutes.js";


const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json({limit: '100kb'}));
app.use(cors());
app.use(logger);

// connection to db
await connectMongoDB();


app.use(notesRoutes);



// middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is startet on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
