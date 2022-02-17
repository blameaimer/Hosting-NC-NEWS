const apiRouter = require('express').Router();
const{getEndPoints} = require('../controllers/forapi')
const topicRouter = require('./topics-router');
const articleRouter = require('./articles-router')
const userRouter = require('./users-router')
const commentRouter = require('./comments-router')
apiRouter.get('/api',getEndPoints);
apiRouter.use("/api/topics",topicRouter)
apiRouter.use("/api/articles",articleRouter)
apiRouter.use("/api/users",userRouter)
apiRouter.use("/api/comments",commentRouter)

module.exports = apiRouter;