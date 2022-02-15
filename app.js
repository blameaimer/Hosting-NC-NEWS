const express = require("express");
const app = express();

const {getTopics} = require('./controllers/topic-controller')
const {handleInvalidPaths,handlePSQLErrors,handleServerErrors,handleCustomErrors} = require('./errors/index')
const {getArticleById,patchArticleById,getArticles} = require('./controllers/article-controller')
const {getUsers} = require('./controllers/user-controller')
const{getCommentsByArticleId} = require('./controllers/comment-controller')


app.use(express.json());

//GETS
app.get("/api/topics", getTopics)
app.get("/api/articles",getArticles)
app.get("/api/articles/:article_id",getArticleById)
app.get("/api/users",getUsers)
app.get("/api/articles/:article_id/comments",getCommentsByArticleId)
//POSTS

//PATCHS
app.patch("/api/articles/:article_id",patchArticleById)




//ERRORS
app.use("/api/*",handleInvalidPaths)
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleServerErrors)

module.exports = app;