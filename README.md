<div align="center">
  <img src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777184/secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png" alt="NodeJS LOGO" width="400" />
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
    <a href="https://nc-news-blame.herokuapp.com/api"><b>Hosted Version</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-getting-started"><b>Usage</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-further-help"><b>Need help?</b></a>
  </p>
  <br />
</div>

---


## 👋 Intro

The News app offers a RESTful API which was built in NodeJS using [express](https://expressjs.com/),[postgresql](https://www.postgresql.org/),[jest](https://jestjs.io/)

---

## 🚀 Getting Started

* In your terminal go into a directory and then run the following command:

        git clone https://github.com/blameaimer/Hosting-NC-backend
        cd Hosting-NC-backend


* Run this code in your terminal:

        npm i


* After you have installed them setup your .env files for DB connection:

        In order to access the correct database you will have to setup 2 seperated connections. 
        Therefore you will have to create .env files where you declare the database name 
        for the associated environment. 
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
   
#### Minimum Node.js & Postgres needed to run the project
* Node.js >= 17.2
* psql >= 12.9(ubuntu)
    
### API Reference

#### Get all end-points avaliable in the application

```http
  GET /api
```
---

## 👊 Further Help?
This is my first public back-end project feel free to email/tweet me any questions , advices regarding this project <br />
Created by Rajmund Noel Gyuris <br />
 <a href="https://twitter.com/blamexcode">
      <img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" />
    </a> <br />
email:blameaimer@gmail.com 
<br />
@2022

