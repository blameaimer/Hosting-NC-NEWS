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