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
WHERE article_id = ${[id]}`
    )
    .then(({ rows }) => {
      const topic = rows[0];
      if (!topic) {
        return Promise.reject({
          status: 404,
          msg: `No topic found for id: ${id}`,
        })
      }
      return topic
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
