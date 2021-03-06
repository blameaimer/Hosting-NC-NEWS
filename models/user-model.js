const db = require("../db/connection");


exports.selectUsers=()=>{
    return db.query(`SELECT username FROM users;`).then(({ rows }) => {
      return rows;
    });
  }



  exports.  selectUserByUsername=(username)=>{


    return db.query(`SELECT * FROM users 
    WHERE username = $1;`,[username])
    .then(({rows})=>{
      const user = rows[0];
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: `${username} Not found!`,
        });
      }
      return user
     })
  }