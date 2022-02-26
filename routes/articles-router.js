const articleRouter = require('express').Router();
const {getArticleById,patchArticleById,getArticles} = require('../controllers/article-controller')
const{getCommentsByArticleId,postComment} = require('../controllers/comment-controller')
articleRouter.route('/', getArticles)
.get(getArticles)


articleRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticleById)

articleRouter.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(postComment)

module.exports = articleRouter;