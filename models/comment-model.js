const db = require("../db/connection");


exports.selectCommentsByArticleId = (id) => {
    return db
      .query(
        `SELECT comment_id,comments.votes,comments.created_at,comments.author,comments.body
  FROM comments
  JOIN articles ON comments.article_id = articles.article_id
 JOIN users ON comments.author = users.username

  WHERE articles.article_id = $1;`

      ,[id])
      .then(({ rows }) => {

          return rows
      })
  };

  exports.insertComment =(articleId ,newComment)=>{
    const {username,body} = newComment;
    return db
    .query(
        `INSERT INTO comments (body,article_id,author) VALUES ($1,$2,$3) RETURNING comment_id,body,author AS username,votes,created_at;`, 
        [body,articleId,username])
          .then(({rows}) => {return rows[0]}
    )
  }


  exports.deleteCommentById = (commentId) => {

   return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`,[commentId])
   .then(({rows})=>{
    const comment = rows[0];
    if (!comment) {
      return Promise.reject({
        status: 404,
        msg: `No comment found for id: ${commentId}`,
      });
    }
   })
  };

  exports.updateCommentById = (id, voteUpdate) => {
    const { vote } = voteUpdate;
  
    return db
      .query(
        `UPDATE comments 
        SET votes = votes+$1
        WHERE comment_id = $2
        RETURNING *;`,[vote,id]
      )
      .then(({ rows }) => {
        const comment = rows[0];
        if (!comment) {
          return Promise.reject({
            status: 404,
            msg: `No comment found for id: ${id}`,
          });
        }
        return comment;
      })
  
  };
 
