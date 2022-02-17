
# NC-News




## Description

The News app offers a RESTful API which shows titles,topics,authors and many more for news. To achieve this I have used all of my knowledge I've been taught at Northcoders in the past 1 and a half month.

## Hosted Version

[Hosted version](https://nc-news-blame.herokuapp.com/)


## Getting Started

## Installing from Git 

* In your terminal go into a directory and then run the following command:

        git clone https://github.com/blameaimer/NC-backend
        cd NC-backend


## Dependencies

* dotenv >= 16
* express >= 4.17
* pg >= 8.7


## Build Dependencies
These Dependencies are only relevant if you want to build the source code:
* husky >= 7.0
* jest >= 27.5
* jest-sorted >= 1.0.14
* pg-format >= 1.0.4
* supertest >= 6.2.2


### Installing

* Once you have cloned install the dependencies:

        npm i dotenv
        npm i express
        npm i pg
        npm i --save-dev jest
        npm i husky --save-dev
        npm i pg-format
        npm i supertest --save-dev
        
* After you have installed them setup your DB connections:

        In order to access the correct database you will have to setup 2 seperated connections. Therefore you will have to create .env files where you declare the database name for the associated environment. 
        You will find a .env-example file!

* Your package.json should include this:

         "scripts" {
         "setup-dbs": "psql -f ./db/setup.sql",   
         "seed": "node ./db/seeds/run-seed.js", 
         "test": "jest",  
         "prepare": "husky install",   
         "seed:prod": "NODE_ENV=production DATABASE_URL=$(heroku config:get DATABASE_URL),
         npm run seed" "start": "node listen.js"
         }
* Make sure you run these commands before testing:

        npm setup-dbs
        npm seed
* Now you can run the tests:

        npm test
   
## Minimum Node.js & Postgres needed to run the project
* Node.js >= 17.2
* psql >= 12.9(ubuntu)
    
## API Reference

#### Get all end-points avaliable in the application

```http
  GET /api
```


## Author

Rajmund Noel Gyuris

