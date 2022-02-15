const {selectCommentsByArticleId} = require('../models/comment-model')
const {checkArticleExists} = require('../models/article-model')

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    Promise.all([selectCommentsByArticleId(article_id),checkArticleExists(article_id)])
      .then(([comments]) => {
          res.status(200).send({comments})
      })
      .catch((err) => {
        next(err);
      });
  };


