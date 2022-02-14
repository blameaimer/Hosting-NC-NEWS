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
  describe("/api/articles/articleid", () => {
    describe("GET", () => {
    test("should return an object containing a particular topic ", () => {
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
                  votes: expect.any(Number)
                })
          });
      });
      test('this is a test which requests an invalid articleId surrounded by quotation marks and expects a 400 response', () => {
          return request(app)
          .get("/api/articles/'notanid'")
          .expect(400)    
          .then((response) => {
            const {msg} = response._body
            expect(msg).toBe('Bad Request');
          });
      });
      test('this is a test which requests an invalid article id in a different way and expects a 400 response', () => {
        return request(app)
        .get("/api/articles/notanid")
        .expect(400)    
        .then((response) => {
           const {msg} = response._body
          expect(msg).toBe('Bad Request');
        });
    });
    test('requests a non existing topic', () => {
        return request(app)
        .get("/api/articles/69")
        .expect(404)    
        .then((response) => {
           const {msg} = response._body
          expect(msg).toBe('No topic found for id: 69');
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
            const {msg} = response._body
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
            const {msg} = response._body
           expect(msg).toBe('No topic found for id: 252525')
         });
        
    });
  });
})
describe('/api/users', () => {

    describe('GET', () => {
        test.only('should return an array of usernames', () => {
            return request(app)
            .get("/api/users")
            .expect(200)
            .then((response) => {
                response.body.users.forEach((user) => {
                  expect(user).toEqual({
                        username: expect.any(String)
                  })
                });
        });
    });

})
});