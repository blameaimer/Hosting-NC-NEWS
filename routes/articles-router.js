const articleRouter = require('express').Router();
const {getArticleById,patchArticleById,getArticles,postArticle,removeArticleById} = require('../controllers/article-controller')
const{getCommentsByArticleId,postComment} = require('../controllers/comment-controller')
articleRouter.route('/', getArticles)
.get(getArticles)
.post(postArticle)


articleRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticleById)
.delete(removeArticleById)

articleRouter.route('/:article_id/comments')
.get(getCommentsByArticleId)
.post(postComment)

module.exports = articleRouter;