const { response } = require("express");
const request = require("supertest");
const app = require('../app')
const db = require("../db/connection");
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const endpoints = require("../endpoints.json")

//TESTS ------------------------------------------------------
beforeEach(() => seed(testData)); // seeding test data before each test
afterAll(() => {
    if (db.end) db.end(); // after tests are done ending db connection
  });
//

 describe('Invalid path error test', () => {
    test('this should response with a 404 status and a msg body', () => {
    return request(app)
    .get("/api/teatasd")
    .expect(404)  
    .then((response) => {
      expect(response.error.text).toBe('Path not found!');
    });
})
  });

  describe('/api', () => {
    describe('GET', () => {
      test('should return a description about the endpoints', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then((response)=>{
          expect(response.body).toEqual(endpoints)
        })
      });
    });
  });
describe("/api/topics", () => {
    describe("GET", () => {
    test("should return an object containing all slugs and descriptions ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body.topics).toHaveLength(3);
          response.body.topics.forEach((topic) => {
            expect(topic).toEqual(
              {
                slug: expect.any(String),
                description: expect.any(String),
              })
            
          });
        });
    });
  });
      describe('POST', () => {
        test('should return the newly added topic', () => {
            const newTopic ={
              slug: 'dogs',
              description: 'everything about dogs'
            }
          return request(app)
          .post("/api/topics")
          .send(newTopic)
          .expect(201)
          .then((response)=>{
              expect(response.body.topic).toEqual({
                 slug: 'dogs', 
                 description: 'everything about dogs' 
              }
              )
          })
        });

        test('should return 400', () => {
          const newTopic ={
            slugfdgdg: 'dogs',
            description: 'everything about dogs'
          }
        return request(app)
        .post("/api/topics")
        .send(newTopic)
        .expect(400)
        .then((response) => {
          const {msg} = response.body
          expect(msg).toBe('Bad Request');
        });
       
      });
      test('should return 400', () => {
        const newTopic ={
          notslug: 'dogs',
          notdescription: 'everything about dogs'
        }
      return request(app)
      .post("/api/topics")
      .send(newTopic)
      .expect(400)
      .then((response) => {
        const {msg} = response.body
        expect(msg).toBe('Bad Request');
      });
     
    
   
  });

      });
  });
  describe('/api/articles', () => {
      describe('GET', () => {

       test('return an object containing all articles ', () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            
            .then((response) => {
              expect(response.body.articles).toHaveLength(12);
                response.body.articles.forEach((article) => {
                expect(article).toEqual(
                  {
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                  })
            });
        })
          });
          test('test for descending order by date', () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
            expect(response.body.articles).toBeSorted({key:'created_at',descending:true})
          });
        })
        test('return an object containing all articles now with a comment count ', () => {
          return request(app)
          .get("/api/articles")
          .expect(200)
          
          .then((response) => {
            expect(response.body.articles).toHaveLength(12);
              response.body.articles.forEach((article) => {
              expect(article).toEqual(
                {
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(String)
                })
          });
      })
      });
      test('test for descending order by title ', () => {
        return request(app)
        .get("/api/articles?sort_by=title")
        .expect(200)
        .then((response) => {
        expect(response.body.articles).toBeSorted({key:'title',descending:true})
      });
    })

    test.only('test for descending order by title ', () => {
      return request(app)
      .get("/api/articles?sort_by=comment_count")
      .expect(200)
     
  })
  
  test('test for ascending order by date(default)', () => {
    return request(app)
    .get("/api/articles?order=asc")
    .expect(200)
    .then((response) => {
    expect(response.body.articles).toBeSorted({key:'created_at',descending:false})
  });
  })
  test('this test should have a return of the articles about cats', () => {
    return request(app)
    .get("/api/articles?topic=cats")
    .expect(200)
    .then((response) => {
    expect(response.body.articles).toHaveLength(1);
  });
  
  })
  test('this test should have a return of the articles about mitchs', () => {
    return request(app)
    .get("/api/articles?topic=mitch")
    .expect(200)
    .then((response) => {
    expect(response.body.articles).toHaveLength(11);
  });
})
test('this test should have a return of the articles about mitchs', () => {
  return request(app)
  .get("/api/articles?topic=paper")
  .expect(404)
  .then((response) => {
    const {msg} = response.body
    expect(msg).toBe('No topic/No article found at paper');
  });
})
  test('test for invalid topic input', () => {
    return request(app)
    .get("/api/articles?topic=waffle")
    .expect(404)
    .then((response) => {
      const {msg} = response.body
      expect(msg).toBe('No topic/No article found at waffle');
    });
  });
  test('test for invalid order input', () => {
    return request(app)
    .get("/api/articles?order=waffle")
    .expect(400)
  .then((response) => {
    const {msg} = response.body
    expect(msg).toBe('Bad Request');
  });
  })
  test('test for sort by input', () => {
  return request(app)
  .get("/api/articles?sort_by=waffle")
  .expect(400)
  .then((response) => {
    const {msg} = response.body
    expect(msg).toBe('Bad Request');
  });
  });
      

 
          test('should return page 1 with 10 articles', () => {
            return request(app)
            .get("/api/articles?p=1")
            .expect(200)
            .then((response) => {
              expect(response.body.articles).toHaveLength(10)
              expect(response.body.total_count).toBe(12)
              response.body.articles.forEach((article) => {
                expect(article).toEqual(
                  {
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
          
                  })
            });
          })})
          test('should return page 1 with 5 articles', () => {
            return request(app)
            .get("/api/articles?limit=5&&p=1")
            .expect(200)
            .then((response) => {
              expect(response.body.articles).toHaveLength(5)
               expect(response.body.total_count).toBe(12)
              response.body.articles.forEach((article) => {
                expect(article).toEqual(
                  {
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
          
                  })
            });
          })})
          test('400 for invalid limit input', () => {
            return request(app)
            .get("/api/articles?limit=waffle&&p=1")
            .expect(400)
            
          })
          test('400 for invalid page input', () => {
            return request(app)
            .get("/api/articles?limit=waffle&&p=rewrew")
            .expect(400)
            
          })
          test('404 for invalid page', () => {
            return request(app)
            .get("/api/articles?limit=1&&p=432432")
            .expect(404)
            
          })
        

  });
  describe('POST', () => {

     
  test('this test should have a return of the articles about mitchs', () => {
    const newArticle = {
      author: 'rogersop',
      title: "dogsareamazing",
      body: "we don't deserve dogs for sure",
      topic: 'cats'
    }
    return request(app)
    .post('/api/articles')    
    .send(newArticle)
        .expect(201)
        .then((response) => {
          expect(response.body.article).toEqual({
            article_id: 13,
            votes: 0,
            created_at: expect.any(String),
            comment_count: "0"
          });
        })
      });
      test('should respond with an error the author does not exist ', () => {

        const newArticle = {
          author: 'fdsdsf',
          title: "dogsareamazing",
          body: "we don't deserve dogs for sure",
          topic: 'cats'
        }
          return request(app)
          .post('/api/articles')
          .send(newArticle)
          .expect(400)

        });
        test('should respond with an error invalid property ', () => {

          const newArticle = {
            fdsfds: 'rogersop',
            title: "dogsareamazing",
            body: "we don't deserve dogs for sure",
            topic: 'cats'
          }
            return request(app)
            .post('/api/articles')
            .send(newArticle)
            .expect(400)

          });
          test('should respond with an error the author does not exist ', () => {

            const newArticle = {
              author: 'fdsdsf',
              title: "dogsareamazing",
              fds: "we don't deserve dogs for sure",
              gfdgfd: 'cats'
            }
              return request(app)
              .post('/api/articles')
              .send(newArticle)
              .expect(400)

            });
          })

  describe("/api/articles/articleid", () => {
    describe("GET", () => {
    test("should return an object containing a particular article ", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then((response) => {
              expect(response.body.article).toEqual(
                {
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  body: expect.any(String),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(String)
                })
                
          });
        })
     
      test('this is a test to see if a specific article has the appropriate comment count length', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200).then((response)=>{
          expect(response.body.article.comment_count).toBe("11")
        })
        
      });
      test('this is a test which requests an invalid articleId surrounded by quotation marks and expects a 400 response', () => {
          return request(app)
          .get("/api/articles/'notanid'")
          .expect(400)    
          .then((response) => {
            const {msg} = response.body
            expect(msg).toBe('Bad Request');
          });
      });
      test('this is a test which requests an invalid article id in a different way and expects a 400 response', () => {
        return request(app)
        .get("/api/articles/notanid")
        .expect(400)    
        .then((response) => {
           const {msg} = response.body
          expect(msg).toBe('Bad Request');
        });
    });
    test('requests a non existing article', () => {
        return request(app)
        .get("/api/articles/69")
        .expect(404)    
        .then((response) => {
           const {msg} = response.body
          expect(msg).toBe('No article found for id: 69');
        });
    });
    });

    describe('PATCH', () => {
      test('status:200, responds with the updated article', () => {
      const newVote = {
        vote: 19
      };

      return request(app)
        .patch('/api/articles/3')
        .send(newVote)
        .expect(200)
        .then((response) => {
          expect(response.body.article.votes).toEqual(19);
        });
    });
    test('same test but with negative integer', () => {
        const anotherVote = {
            vote : -200
        }
        return request(app)
        .patch('/api/articles/4')
        .send(anotherVote)
        .expect(200)
        .then((response) => {
          expect(response.body.article.votes).toEqual(-200);
        });
    });
   
    test('this is a test where the given vote is not a number', () => {
        const anotherVote = {
            vote : "fds"
        }
        return request(app)
        .patch('/api/articles/4')
        .send(anotherVote)
        .expect(400)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('Bad Request');
         });
        
    });
    test('test for invalid article id handling', () => {

        const newVote = {
            vote: 19
          };
        return request(app)
        .patch('/api/articles/252525')
        .send(newVote)
        .expect(404)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('No article found for id: 252525')
         });
        
    });
    test('the patch body has an invalid key', () => {
        const anotherVote = {
            votez : "fds"
        }
        return request(app)
        .patch('/api/articles/4')
        .send(anotherVote)
        .expect(400)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('Bad Request');
         });
        
    });
  });
  describe("DELETE", () => {
    test("should return an empty response body ", () => {
      return request(app)
        .delete("/api/articles/2")
        .expect(204)
        .then(()=>{
          return db.query("SELECT article_id FROM comments WHERE article_id = 2")
        })
        .then(({rows})=>{
           expect(rows).toEqual([]);
        })
    });

    test("should return an 404 because the comment id is not found ", () => {
      return request(app)
        .delete("/api/articles/595")
        .expect(404)
        .then((response)=>{
        expect(response.body.msg).toBe('No article found for id: 595')
        })
    });
  });
 })
})
describe('/api/users', () => {

    describe('GET', () => {
        test('should return an array of usernames', () => {
            return request(app)
            .get("/api/users")
            .expect(200)
            .then((response) => {
              expect(response.body.users).toHaveLength(4);
                response.body.users.forEach((user) => {
                  expect(user).toEqual({
                        username: expect.any(String)
                  })
                });
        });
    });

})
});
describe('/api/users/:username', () => {
  describe('GET', () => {
    test('should return a specific user by the username passed to the endpoint', () => {
      return request(app)
      .get("/api/users/rogersop")
      .expect(200)
      .then((response) => {
            expect(response.body.user).toEqual({
              username: 'rogersop',
              name: 'paul',
              avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4'
            })
  });
    });
    test('this should return a 404 and a msg user not found', () => {
      return request(app)
      .get("/api/users/erwrewrew")
      .expect(404)
      .then((response) => {
        const {msg} = response.body
       expect(msg).toBe('erwrewrew Not found!')
     });
    });
  });
  
});

describe('/api/articles/:article_id/comments', () => {

  describe('GET', () => {

    test('return an object containing all comments for a particular article ', () => {
      return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      
      .then((response) => {
          expect(response.body.comments).toHaveLength(11);
          response.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            {
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String), 
              body: expect.any(String)
            })

      });
  })
})
test('return an empty array because the second article has no comments ', () => {
  return request(app)
  .get("/api/articles/2/comments")
  .expect(200)
  .then((response) => {
      expect(response.body.comments).toHaveLength(0);
      expect(response.body.comments).toEqual([])
})
})
    test('this test should return an error 404 because the given article id is invalid', () => {

      return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('No article found for id: 999')
         });
      
    });

    test('should return page 1 with 5 comments', () => {
      return request(app)
      .get("/api/articles/1/comments?limit=5&p=1")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toHaveLength(5)
        response.body.comments.forEach((comment) =>{
        expect(comment).toEqual(expect.objectContaining({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String)
        }))});
      });
      
      });
      test('should return page 1 with 10 comments(by default)', () => {
        return request(app)
        .get("/api/articles/1/comments?p=1")
        .expect(200)
        .then((response) => {
          expect(response.body.comments).toHaveLength(10)
          response.body.comments.forEach((comment) =>{
          expect(comment).toEqual(expect.objectContaining({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String)
          }))});
        });
        
        });
      test('should return 400', () => {
        return request(app)
        .get("/api/articles/1/comments?limit=waffle&p=1")
        .expect(400)
      })


      test('should return 400', () => {
        return request(app)
        .get("/api/articles/1/comments?limit=waffle&p=lolo")
        .expect(400)
      })
});
  describe('POST', () => {
test('this test should return the newly added comment ', () => {
  
  const newComment = {
    username: "rogersop",
    body: "GOAT never seen a better article"
  }
    return request(app)
    .post('/api/articles/1/comments')
    .send(newComment)
    .expect(201)
    .then((response) => {
      expect(response.body.comment).toEqual({
        comment_id: 19,
        username: 'rogersop',
        body: 'GOAT never seen a better article',
        votes: 0,
        created_at: expect.any(String)
      });
    })
  });


  test('this test should return respond with an error cuz the article does not exist ', () => {
  
    const newComment = {
      username: "rogersop",
      body: "GOAT never seen a better article"
    }
      return request(app)
      .post('/api/articles/888/comments')
      .send(newComment)
      .expect(400)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('Bad Request')
         });
    });
    test('wrong username property given', () => {
  
      const newComment = {
        fdsfs: "rogersop",
        body: "GOAT never seen a better article"
      }
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(400)
          .then((response) => {
              const {msg} = response.body
             expect(msg).toBe('Bad Request')
           });
      });
      test('wrong property name given for body', () => {
  
        const newComment = {
          username: "rogersop",
          notbody: "GOAT never seen a better article"
        }
          return request(app)
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(400)
            .then((response) => {
                const {msg} = response.body
               expect(msg).toBe('Bad Request')
             });
        });

      test('number given instead of string at the username', () => {
  
        const newComment = {
          username: 123,
          body: "GOAT never seen a better article"
        }
          return request(app)
          .post('/api/articles/1/comments')
          .send(newComment)
          .expect(400)
            .then((response) => {
                const {msg} = response.body
               expect(msg).toBe('Bad Request')
             });
        });
  });
});

describe('/api/comments/:comment_id', () => {

    describe("DELETE", () => {
    test("should return an empty response body ", () => {
      return request(app)
        .delete("/api/comments/2")
        .expect(204)
        .then(()=>{
          return db.query("SELECT comment_id FROM comments WHERE comment_id = 2")
        })
        .then(({rows})=>{
           expect(rows).toEqual([]);
        })
    });

    test("should return an 404 because the comment id is not found ", () => {
      return request(app)
        .delete("/api/comments/595")
        .expect(404)
        .then((response)=>{
        expect(response.body.msg).toBe('No comment found for id: 595')
        })
    });
  });
  describe('PATCH', () => {
  
      test('status:200, responds with the updated comment', () => {
        const newVote = {
          vote: 19
        };
  
        return request(app)
          .patch('/api/comments/3')
          .send(newVote)
          .expect(200)
          .then((response) => {
            expect(response.body.comment.votes).toEqual(119);
          });
      });
      test('same test but with negative integer', () => {
        const anotherVote = {
            vote : -200
        }
        return request(app)
        .patch('/api/comments/4')
        .send(anotherVote)
        .expect(200)
        .then((response) => {
          expect(response.body.comment.votes).toEqual(-300);
        });
    });
   
    test('this is a test where the given vote is not a number', () => {
        const anotherVote = {
            vote : "fds"
        }
        return request(app)
        .patch('/api/comments/4')
        .send(anotherVote)
        .expect(400)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('Bad Request');
         });
        
    });
    test('test for invalid article id handling', () => {

        const newVote = {
            vote: 19
          };
        return request(app)
        .patch('/api/comments/252525')
        .send(newVote)
        .expect(404)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('No comment found for id: 252525')
         });
        
    });
    test('the patch body has an invalid key', () => {
        const anotherVote = {
            votez : "fds"
        }
        return request(app)
        .patch('/api/comments/4')
        .send(anotherVote)
        .expect(400)
        .then((response) => {
            const {msg} = response.body
           expect(msg).toBe('Bad Request');
         });
        
    });
  })
  });
