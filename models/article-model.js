const db = require("../db/connection");


exports.selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.author,title,articles.article_id,articles.body,topic,articles.created_at,articles.votes,COUNT(comments.body) AS comment_count
FROM articles 
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


exports.selectArticles = (sort_by='created_at',order='desc',topic=null,limit=10,p) => {


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
LEFT JOIN comments ON articles.article_id = comments.article_id`

let arr = [];
  if(topic){
    strQuery+= ` WHERE topic = $1 `  
    arr.push(topic)
}

strQuery += ` GROUP BY articles.article_id`
  if(sort_by||order){
    strQuery+= ` ORDER BY articles.${[sort_by]} ${[order]}`
  }
if(limit&&p){
  if(!Number(limit) || !Number(p)){
 
    return Promise.reject({status: 400, msg: "Bad Request"});
  }
  strQuery+= ` LIMIT ${limit} OFFSET ${limit*(p-1)}`
}
strQuery+=';'
return db
  .query(strQuery,arr
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
  }).then((rows)=>{
    let newarr =[]
   let strQuery=`SELECT * FROM articles `
    if(topic){
      strQuery+= `WHERE topic = $1`  
      newarr.push(topic)
  }
    const totalcount =db.query(
      strQuery,newarr
    )
   
    return Promise.all([rows,totalcount])
  }).then(([rows,totalcount])=>{
    
    const data = {articles: rows,total_count: totalcount.rows.length}
    return data
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

exports.insertArticle =(newArticle)=>{
  const {author,title,body,topic} = newArticle;
  return db
  .query(
      `INSERT INTO articles (title,topic,author,body) VALUES ($1,$2,$3,$4) 
       RETURNING article_id,votes,created_at;`, 
      [title,topic,author,body])
        .then(({rows}) => {
         return db
         .query(
           `SELECT articles.article_id,articles.votes,articles.created_at,COUNT(comment_id) AS comment_count
           FROM articles 
JOIN users ON articles.author = users.username
FULL OUTER JOIN comments ON articles.article_id = comments.article_id
WHERE articles.article_id = $1
GROUP BY articles.article_id,articles.author,title;`,[rows[0].article_id]
         )
        }
  ).then(({rows})=>{
    return rows[0]
  })
}