const apiRouter = require('express').Router();
const{getEndPoints} = require('../controllers/forapi')
const topicRouter = require('./topics-router');
const articleRouter = require('./articles-router')
const userRouter = require('./users-router')
const commentRouter = require('./comments-router')
apiRouter.get('/',getEndPoints);
apiRouter.use("/topics",topicRouter)
apiRouter.use("/articles",articleRouter)
apiRouter.use("/users",userRouter)
apiRouter.use("/comments",commentRouter)

module.exports = apiRouter;