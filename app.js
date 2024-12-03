
var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
const MongoStore = require('connect-mongo');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// MongoClient.connect("mongodb://localhost:27017" , function(err , client) {

//   if(err) throw err;
//   let db = client.db('myDB');
//   db.collection('myCollection').insertOne({id : 1 , name : "ali"})

// });

const client = new MongoClient("mongodb://localhost:27017");
const collection = client.db('myDB').collection('myCollection');


app.use(session({
  secret: "ali",
  resave: false,
  saveUninitialized: false,

  // store: MongoStore.create({

  //   client: client,
  //   dbName: 'myDB',
  //   collectionName: 'myCollection'

  // })

}))



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/' , function(req , res) {

  res.redirect('login')

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/login' , function(req , res){
  res.render('login' , {flag : false})
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/registration' , function(req,res) {

  res.render('registration' , {regErrMessage : ""})

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/home' , function(req , res) {

  console.log("Username in session for just logged in user" + req.session.username)

  if (req.session.username) {

    res.render('home')
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/hiking' , function(req , res) {

  if (req.session.username) {

    res.render('hiking')
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/cities' , function(req , res) {


  if (req.session.username) {

    res.render('cities')
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/islands' , function(req , res) {

  if (req.session.username) {

    res.render('islands')
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/inca' , function(req , res) {

  if (req.session.username) {

    res.render('inca', {wtgError : false})
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/annapurna' , function(req , res) {

  if (req.session.username) {

    res.render('annapurna', {wtgError : false})
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/paris' , function(req , res) {

  if (req.session.username) {

    res.render('paris', {wtgError : false})
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/rome' , function(req , res) {

  if (req.session.username) {

    res.render('rome', {wtgError : false})
  }
  else {

    res.redirect("login")

  }
  
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/bali' , function(req , res) {

  if (req.session.username) {

    res.render('bali', {wtgError : false})
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/santorini' , function(req , res) {

  if (req.session.username) {

    res.render('santorini', {wtgError : false})
  }
  else {

    res.redirect("login")

  }
  

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/wanttogo' , async function(req , res) {
  if (req.session.username) {

    res.render('wanttogo' , {want_to_go_list : (await collection.findOne({username : req.session.username})).want_to_go_list})

  }
  else {

    res.redirect("login")

  }
  

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/searchresults' ,function(req,res) {

  res.render('searchresults')

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/login' ,  async function(req,res) {
  var usernameInput = req.body.username
  var passwordInput = req.body.password
  
  const user =  await collection.findOne({username : usernameInput, password : passwordInput});
  
  
  if(user) {

    req.session.username = usernameInput
    res.redirect('home')

  }
  else {
      
      res.render('login' , {flag : true})

  }
  
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/register' , async function(req,res){

  var usernameInput = req.body.username
  var passwordInput = req.body.password

  user = await collection.findOne({username : usernameInput})
  

  if(!usernameInput || !passwordInput) {

    res.render('registration' , {regErrMessage : "Username and Password Fields Should Not Be Empty"})
    
  }
  else if (user) {
    res.render('registration' , {regErrMessage : "Username Already Taken Please Enter Another One"})
  }

  else if(!user) {

    await collection.insertOne({username : usernameInput , password : passwordInput , want_to_go_list : []})
    res.redirect('/login')

  }
  

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-to-want-to-go-annapurna' , async function(req,res) {

  var user = await collection.findOne({username : req.session.username})

  if(req.session.username) {

    if(user.want_to_go_list.includes("Annapurna")) {

      res.render("annapurna" , {wtgError : true})

    }
    else {

      await collection.updateOne({username : req.session.username} , {$push : {want_to_go_list : "Annapurna"}})

    }

  }
  else {

    res.redirect("login")

  }
  
  

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-to-want-to-go-bali' , async function(req,res) {

  var user = await collection.findOne({username : req.session.username})

  if(req.session.username) {

    if(user.want_to_go_list.includes("Bali")) {

      res.render("bali" , {wtgError : true})

    }
    else {

      await collection.updateOne({username : req.session.username} , {$push : {want_to_go_list : "Bali"}})

    }

  }
  else {

    res.redirect("login")

  }
  
  

})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-to-want-to-go-inca' , async function(req,res) {

  var user = await collection.findOne({username : req.session.username})

  if(req.session.username) {

    if(user.want_to_go_list.includes("Inca")) {

      res.render("inca" , {wtgError : true})

    }
    else {

      await collection.updateOne({username : req.session.username} , {$push : {want_to_go_list : "Inca"}})

    }

  }
  else {

    res.redirect("login")

  }
  
  

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-to-want-to-go-paris' , async function(req,res) {

  var user = await collection.findOne({username : req.session.username})

  if(req.session.username) {

    if(user.want_to_go_list.includes("Paris")) {

      res.render("paris" , {wtgError : true})

    }
    else {

      await collection.updateOne({username : req.session.username} , {$push : {want_to_go_list : "Paris"}})

    }

  }
  else {

    res.redirect("login")

  }
  
  

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-to-want-to-go-rome' , async function(req,res) {

  var user = await collection.findOne({username : req.session.username})

  if(req.session.username) {

    if(user.want_to_go_list.includes("Rome")) {

      res.render("rome" , {wtgError : true})

    }
    else {

      await collection.updateOne({username : req.session.username} , {$push : {want_to_go_list : "Rome"}})

    }

  }
  else {

    res.redirect("login")

  }
  
  

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/add-to-want-to-go-santorini' , async function(req,res) {

  var user = await collection.findOne({username : req.session.username})

  if(req.session.username) {

    if(user.want_to_go_list.includes("Santorini")) {

      res.render("santorini" , {wtgError : true})

    }
    else {

      await collection.updateOne({username : req.session.username} , {$push : {want_to_go_list : "Santorini"}})

    }

  }
  else {

    res.redirect("login")

  }

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/search', function(req,res) {

  Destinations = [

    {Name : "Annapurna" , Page : "/annapurna"},
    {Name : "Bali" , Page : "/bali"},
    {Name : "Inca" , Page : "/inca"},
    {Name : "Paris" , Page : "/paris"},
    {Name : "Rome" , Page : "/rome"},
    {Name : "Santorini" , Page : "/santorini"}

  ]
  const substring = req.body.Search;
  var regex = new RegExp(substring, "i")
  

  const filteredDestinations = Destinations.filter(destination => destination.Name.match(regex) !== null);

  res.render('searchresults', {filteredDestinations : filteredDestinations})
 

  

})



app.listen(3000);

module.exports = app;
