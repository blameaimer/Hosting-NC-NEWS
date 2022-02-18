const commentRouter = require('express').Router();
const{removeCommentById,patchCommentById} = require('../controllers/comment-controller')
commentRouter.route('/:comment_id')
.delete(removeCommentById)
.patch(patchCommentById)

module.exports = commentRouter;