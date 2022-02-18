const express = require("express");
const app = express();

const {handleInvalidPaths,handlePSQLErrors,handleServerErrors,handleCustomErrors} = require('./errors/index')
const apiRouter = require('./routes/api-router');


app.use(express.json());

//GETS
app.use("/api",apiRouter)



//ERRORS
app.use("/api/*",handleInvalidPaths)
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleServerErrors)

module.exports = app;