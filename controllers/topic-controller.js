const {selectTopics,selectArticleById,updateArticleById} = require('../models/topic-model')

exports.getTopics = (req,res,next) =>{
      selectTopics().then((topics)=>{
          res.status(200).send({topics})
      }).catch((err)=>{
          next(err)
      })
  }


  exports.getArticleById = (req,res,next) => {
    const { article_id } = req.params;
    selectArticleById(article_id)
      .then((article) => res.status(200).send({ article }))
      .catch((err) => {
        next(err)
      });
  };


  exports.patchArticleById = (req, res,next) => {
    const { article_id } = req.params;
    updateArticleById(article_id,req.body)
      .then((article) => res.status(200).send({ article }))
      .catch((err) => {
        next(err);
      });
  };