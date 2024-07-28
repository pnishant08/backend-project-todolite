const express = require('express')
const app = express()
const port = 3000
const path=require("path")
const fs=require("fs")



// 1. setting up parser
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//set up static files
app.use(express.static(path.join(__dirname,"public")));

// 2. setting up ejs for ejs pages - install ejs from npm , setup ejs as a view engine

app.set("view engine","ejs")




// now i can write render instead of res
app.get('/', (req, res) => {
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    })
})
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){
        res.redirect("/")
    })
})
app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filename:req.params.filename , filedata:filedata})
    })
})
app.get('/edit/:filename', (req, res) => {
    res.render("edit",{filename:req.params.filename})
})
app.post('/edit', (req, res) => {
     fs.rename(`./files/${req.body.prev}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
        })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// pnishant0824@gmail.com

