import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleRedirect } from "./controllers/redirect.js";

import urlroutes from "./routes/urlroutes.js";


const PORT = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json())

app.use('/api/shortner', urlroutes);

app.get('/:code', handleRedirect);

app.listen(PORT, ()=>{
    console.log(` Server is running at http://localhost:${PORT}`);
});

