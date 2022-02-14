const express = require("express");
const app = express();

const {getTopics,getArticleById} = require('./controllers/topic-controller')
const {handleInvalidPaths,handlePSQLErrors,handleServerErrors,handleCustomErrors} = require('./errors/index')

app.use(express.json());
app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id",getArticleById)

app.use("/api/*",handleInvalidPaths)
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleServerErrors)

module.exports = app;