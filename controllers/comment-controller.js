const {selectCommentsByArticleId,insertComment,deleteCommentById} = require('../models/comment-model')
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

  exports.postComment = (req,res,next) =>{
    const {article_id} = req.params;
insertComment(article_id,req.body)

    .then((comment)=>{
        res.status(201).send({comment})
    })
    .catch((err)=>{
        next(err);
    })
   }

  exports.removeCommentById = (req, res,next) => {

    const { comment_id } = req.params;
    deleteCommentById(comment_id)
      .then(() => {
        res.sendStatus(204)
      })
      .catch((err) => {
        next(err)
      });
  };