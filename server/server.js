// Entry Point of the Hub server. 

// Import modules. 
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { PORT } from "./env.js";
import setupCluster from "./cluster.js";

// Create server. 
let server = express(); 



// Plugin middleewares. 
server.use(express.json());
server.use(bodyParser.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());


// Error Handling Middleware
import errorHandler from "./middlewares/error.middlewares.js";
server.use(errorHandler)

// Set-up clusters.
setupCluster(server, PORT);

