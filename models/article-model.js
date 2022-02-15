const db = require("../db/connection");


exports.selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.author,title,articles.article_id,articles.body,topic,articles.created_at,articles.votes,COUNT(comments.body)
FROM articles 
JOIN users ON articles.author = users.username
LEFT JOIN comments ON articles.article_id = comments.article_id
WHERE articles.article_id = $1
GROUP BY articles.article_id,articles.author,title`
    ,[id])
    .then(({ rows }) => {
      const topic = rows[0];
      if (!topic) {
        return Promise.reject({
          status: 404,
          msg: `No topic found for id: ${id}`,
        });
      }
      return topic;
    })
    .catch((err) => {
        console.log(err)
      return Promise.reject(err);
    });
};
exports.selectArticles = () => {
  return db
    .query(
      `SELECT author,title,article_id,body,topic,created_at,votes 
FROM articles 
LEFT JOIN users ON articles.author = users.username
ORDER BY title DESC
`)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
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
      const topic = rows[0];
      if (!topic) {
        return Promise.reject({
          status: 404,
          msg: `No topic found for id: ${id}`,
        });
      }
      return topic;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
