const express = require("express");
const app = express();

const {getTopics,getArticleById,patchArticleById} = require('./controllers/topic-controller')
const {handleInvalidPaths,handlePSQLErrors,handleServerErrors,handleCustomErrors} = require('./errors/index')



app.use(express.json());

//GETS
app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id",getArticleById)
//POSTS

//PATCHS
app.patch("/api/articles/:article_id",patchArticleById)




//ERRORS
app.use("/api/*",handleInvalidPaths)
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleServerErrors)

module.exports = app;