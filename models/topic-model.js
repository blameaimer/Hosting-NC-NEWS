const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.selectArticleById = (id) => {
  return db
    .query(
      `SELECT author,title,article_id,body,topic,created_at,votes 
FROM articles 
JOIN users ON articles.author = users.username
WHERE article_id = $1`
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

exports.selectUsers=()=>{
  return db.query(`SELECT username FROM users`).then(({ rows }) => {
    return rows;
  });
}