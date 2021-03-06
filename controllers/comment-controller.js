const {selectCommentsByArticleId,insertComment,deleteCommentById,updateCommentById} = require('../models/comment-model')
const {checkArticleExists} = require('../models/article-model')

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id, } = req.params;
    
    const {limit,p} = req.query;

    Promise.all([selectCommentsByArticleId(article_id,limit,p),checkArticleExists(article_id)])
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


  exports.patchCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    updateCommentById(comment_id, req.body)
      .then((comment) => res.status(200).send({ comment }))
      .catch((err) => {
        next(err);
      });
  };