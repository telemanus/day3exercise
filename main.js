//load libraries
const express=require('express');
const path=require('path');
const hbs=require('express-handlebars');
const fs=require("fs");


//create an instance of express
const app=express();

const testFolder='public/asset';
const fList=[];

    fs.readdirSync(testFolder).forEach(file => {
            console.log(file);
            fList.push(file);
    });

//const randomFile = fList[Math.floor(Math.random()*fList.length)];

//configrue express to use handbars as the rendering engine
app.engine('hbs',hbs());
app.set('view engine', 'hbs');
//app.set('time', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname ,'image')));

app.get('/asset', (req,res)=>{
    res.status(200);
    var randomFile = fList[Math.floor(Math.random()*fList.length)];
    var randomFile1 = fList[Math.floor(Math.random()*fList.length)];
    var randomFile2 = fList[Math.floor(Math.random()*fList.length)];
    var randomFile3 = fList[Math.floor(Math.random()*fList.length)];
    var randomFile4 = fList[Math.floor(Math.random()*fList.length)];


    res.format({
        'text/html':()=>{


            //res.send(`<img width="350px" src="${randomFile}">`);
            res.render ('my-views', {
                randomFile1: randomFile1, 
                randomFile2: randomFile2, 
                randomFile3: randomFile3, 
                randomFile4: randomFile4, 
                layout: false});
        },
        'application/json':()=>{
            res.json({imageURL: `/${randomFile}`});
        },
        'image/jpg':()=>{
            res.sendFile(path.join(__dirname, 'public/asset', randomFile));
        },
        'image/png':()=>{
            res.sendFile(path.join(__dirname, 'public/asset', randomFile));
        },
        'default':()=>{
            res.status(406);
            res.sendFile(path.join(__dirname, 'public', 'error.html'));        
        }
    });

    });



//Start web server
//start server on port 3000 if undefined on command line
const PORT=parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});

