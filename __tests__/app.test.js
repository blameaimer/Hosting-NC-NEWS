const request = require("supertest");
const app = require('../app')
const db = require("../db/connection");
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');

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
                    votes: expect.any(Number)
                  })
            });
        })
          });
          test('test for descending order by title as it was not specified which key should I use in the ticket', () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then((response) => {
            expect(response.body.articles).toBeSorted({key:'title',descending:true})
          });
        })
      });
      
  });
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
      });
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
});
  describe.only('POST', () => {
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