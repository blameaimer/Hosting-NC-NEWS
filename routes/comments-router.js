const commentRouter = require('express').Router();
const{removeCommentById,updateComment} = require('../controllers/comment-controller')
commentRouter.route('/:comment_id')
.delete(removeCommentById)
.patch(updateComment)

module.exports = commentRouter;