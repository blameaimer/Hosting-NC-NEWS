const express = require("express");
const app = express();

const {getTopics} = require('./controllers/topic-controller')

app.use(express.json());
app.get("/api/topics", getTopics)




app.use("/api/*",(req,res)=>{
    res.status(404).send('Path not found!');
})
module.exports = app;