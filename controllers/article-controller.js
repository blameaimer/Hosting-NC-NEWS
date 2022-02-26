const { selectArticleById,updateArticleById,selectArticles,insertArticle,deleteArticleById} = require('../models/article-model')



exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id)
      .then((article) => res.status(200).send({ article }))
      .catch((err) => {
        next(err);
      });
  };
  exports.getArticles = (req, res, next) => {
    const {sort_by,order,topic,limit,p} =req.query;
      selectArticles(sort_by,order,topic,limit,p)
        .then((data) => res.status(200).send(data))
        .catch((err) => {

          next(err);
        });
    };
  
  exports.patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    updateArticleById(article_id, req.body)
      .then((article) => res.status(200).send({ article }))
      .catch((err) => {
        next(err);
      });
  };


  exports.postArticle = (req,res,next) =>{
  
insertArticle(req.body)
    .then((article)=>{

        res.status(201).send({article})
    })
    .catch((err)=>{

        next(err);
    })
   }


   exports.removeArticleById = (req, res,next) => {

    const { article_id } = req.params;
    deleteArticleById(article_id)
      .then(() => {
        res.sendStatus(204)
      })
      .catch((err) => {
        next(err)
      });
  };
   

