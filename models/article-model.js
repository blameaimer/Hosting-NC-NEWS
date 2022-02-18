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


exports.selectArticles = (sort_by='created_at',order='desc',topic,limit=10,p) => {


  const validsortby = ["created_at","article_id","title","topic","author","body","votes"]
  if(!validsortby.includes(sort_by)){
      return Promise.reject({status: 400, msg: "Bad Request"});
}
const validorder=["desc","asc"]
if(!validorder.includes(order)){
  return Promise.reject({status: 400, msg: "Bad Request"});
}
let strQuery = `SELECT articles.author,title,articles.article_id,articles.body,topic,articles.created_at,articles.votes,COUNT(comment_id) AS comment_count
FROM articles 
JOIN users ON articles.author = users.username
FULL OUTER JOIN comments ON articles.article_id = comments.article_id`
  if(topic){
    strQuery+= ` JOIN topics ON topic = topics.slug WHERE topics.slug = '${[topic]}' `
}

strQuery += ` GROUP BY articles.article_id,articles.author,title`
  if(sort_by||order){
    strQuery+= ` ORDER BY articles.${[sort_by]} ${[order]}`
  }
if(limit&&p){
  strQuery+= ` LIMIT ${limit} OFFSET ${limit*p}`
}
console.log(strQuery)
return db
  .query(strQuery
  )
  .then(({ rows }) => {
    
    const article = rows[0];
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: `No topic/No article found at ${topic}`,
      });
    }
    return rows;
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
