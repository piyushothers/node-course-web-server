const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')
app.use((request,response,next)=>{
    var now = new Date().toString();
    var log = `${now} ${request.method} ${request.url}`;
    console.log(log)
    fs.appendFile('server.log',log + '\n' , (err)=>{
        if(err){
            console.log(`unable to append ${err}`);
        }
    })

    next();
})

app.use((request,response,next)=>{
    response.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear());
hbs.registerHelper('screamIt',(text)=> text.toUpperCase())

app.get('/',(request,response)=>{
//response.send('<h1>Hello Express!</h1>');
response.render('home.hbs',{
    welcomeMessage : 'Welcome to your own website'
})
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageTitle:'About page'
    })
});

app.get('/bad',(request,response)=>{
    response.send({
        message: 'Unable to fulfil the request'
    })
})

app.listen(3000 , ()=> "server is up on port 3000");