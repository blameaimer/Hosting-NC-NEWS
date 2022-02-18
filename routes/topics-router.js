const topicRouter = require('express').Router();
const {getTopics,postTopic} = require('../controllers/topic-controller')
topicRouter.route('/')
.get(getTopics)
.post(postTopic)

module.exports = topicRouter;