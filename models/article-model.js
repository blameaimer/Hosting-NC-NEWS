const db = require("../db/connection");


exports.selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.author,title,articles.article_id,articles.body,topic,articles.created_at,articles.votes,COUNT(comments.body) AS comment_count
FROM articles 
JOIN users ON articles.author = users.username
LEFT JOIN comments ON articles.article_id = comments.article_id
WHERE articles.article_id = $1
GROUP BY articles.article_id,articles.author,title;`
    ,[id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for id: ${id}`,
        });
      }
      return article;
    })
};


exports.selectArticles = () => {
  return db
    .query(
      `SELECT articles.author,title,articles.article_id,articles.body,topic,articles.created_at,articles.votes,COUNT(comment_id) AS comment_count
FROM articles 
JOIN users ON articles.author = users.username
FULL OUTER JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id,articles.author,title
ORDER BY title DESC;
`)
    .then(({ rows }) => {
      return rows;
    })
};

exports.updateArticleById = (id, voteUpdate) => {
  const { vote } = voteUpdate;

  return db
    .query(
      `UPDATE articles 
      SET votes = votes+$1
      WHERE article_id = $2
      RETURNING *;`,[vote,id]
    )
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `No article found for id: ${id}`,
        });
      }
      return article;
    })

};

exports.checkArticleExists = (articleId) =>{
  return db
  .query("SELECT * FROM articles WHERE article_id =$1;",[articleId])
  .then(({ rows }) => {
    const article = rows[0];
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: `No article found for id: ${articleId}`,
      });
    }
  })

}
