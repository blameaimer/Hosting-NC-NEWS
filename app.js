const express = require("express");
const app = express();

const {handleInvalidPaths,handlePSQLErrors,handleServerErrors,handleCustomErrors} = require('./errors/index')
const {getUsers} = require('./controllers/user-controller')
const{getCommentsByArticleId,postComment,removeCommentById} = require('./controllers/comment-controller')
const apiRouter = require('./routes/api-router');
app.use(express.json());

//GETS
app.get("/api",apiRouter)
app.get("/api/topics", apiRouter)
app.get("/api/articles",apiRouter)
app.get("/api/articles/:article_id",apiRouter)
app.get("/api/users",apiRouter)
app.get("/api/articles/:article_id/comments",apiRouter)
//POSTS
app.post("/api/articles/:article_id/comments",apiRouter)
//DELETES
app.delete("/api/comments/:comment_id", apiRouter);
//PATCHS
app.patch("/api/articles/:article_id",apiRouter)




//ERRORS
app.use("/api/*",handleInvalidPaths)
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleServerErrors)

module.exports = app;