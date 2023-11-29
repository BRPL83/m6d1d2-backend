import express from 'express';
import apiRouter from "./apiRouter.js";
import mongoose from 'mongoose';
import list from "express-list-endpoints";
import { genericError } from "./middlewares/genericError.js";

const server = express();

const port = 3030;

server.use("/api", apiRouter);

server.use(genericError); //alla fine si mette questo codice cosi che venga letto nel nostro server e cosi non debba saltare per aria "teoricamente" 

mongoose
    .connect(process.env.MONGO_URL)

    .then(() =>{
    server.listen(port, () => {
        console.log('Ciao! server listening to port:' + port);
        console.log(list(server)); //Ci permette di vedere sul teminale vsc gli endpoint (handlers) e le sue caratteristiche 
    });
})

.catch(() => {
    console.log("Error nella connessione al DB");
});

