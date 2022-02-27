<div align="center">
  <img src="https://portswigger.net/cms/images/70/79/895d-article-200624-nodejs-body-text.png" alt="NodeJS LOGO" width="400" />
  <p></p>
  <h1>NC News</h1>
  <p></p>
  <sup>
    <a href="https://github.com/blameaimer/Hosting-NC-NEWS/actions">
      <img src="https://github.com/blameaimer/Hosting-NC-NEWS/actions/workflows/actions.yml/badge.svg" />
    </a>
  </sup>
  <br />
  <p align="center">
    <a href="#-intro"><b>What is this?</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-getting-started"><b>Usage</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-docs"><b>Docs</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-further-help"><b>Need help?</b></a>
  </p>
  <br />
</div>
## Description

The News app offers a RESTful API which shows titles,topics,authors and many more for news. To achieve this I have used all of my knowledge I've been taught at Northcoders in the past 1 and a half month.

## Hosted Version

[Hosted version](https://nc-news-blame.herokuapp.com/api)


## Getting Started

## Installing from Git 

* In your terminal go into a directory and then run the following command:

        git clone https://github.com/blameaimer/Hosting-NC-backend
        cd Hosting-NC-backend


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


*Run this code in your terminal:

        npm i

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

