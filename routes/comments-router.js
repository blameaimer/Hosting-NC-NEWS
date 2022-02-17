const commentRouter = require('express').Router();
const{removeCommentById} = require('../controllers/comment-controller')
commentRouter.route('/comments/:comment_id')
.delete(removeCommentById)

module.exports = commentRouter;