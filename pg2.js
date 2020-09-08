//express and webserver setup
const express = require('express');
const app = express();
//Morgan logging setup
const morgan = require('morgan');
app.use(morgan('short'));//logs program requests
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
/*What do these two do? 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
*/
//Webserver test
app.get("/",(req,res) => {
    console.log("Root response");
    res.send("Hello World!");//res.send send response to server
})


//CRUD
app.get("/users",(req, res) => {
    console.log("Fetching Users")
    client.query('SELECT * FROM USERS')
    .then(results => res.json(results.rows))
    //.then(results => res.json(req))
})

app.get("/users/firstName/:id",async(req,res) =>{
    const name = req.params.id//take input from link req's parameters id
    search("UPPER(first_name) = UPPER($1)",[name])
        .then(results => {res.json(results.rows)})
        .catch(e => console.log(e))
})

app.get('/users/lastName/:id', async(req,res) =>{
    search("UPPER(last_name) = UPPER($1)",[req.params.id])
        .then(results => {res.json(results.rows)})
        .catch(e => console.log(e))
})

app.get('/users/userID/:id', async(req,res) =>{
    
    search("user_id = $1", [ parseInt(req.params.id,10)] )
        .then(results =>{ res.json(results.rows) } )
        .catch(e => console.log(e))
    
})


const search = async(whereClause,values) =>{
    const query = {
        text: 'SELECT * FROM users WHERE ' + whereClause,
        values: values
    }
    return client.query(query)   
}
/*

const search = async(whereClause,values) =>{
    const query = {//create query with whereClause
        name: 'find-user(s)',
        text: "SELECT * FROM users WHERE "+whereClause,
        values: values
    }
    //query returns a promise so the query and then use .then to complete  
    return client.query(query)
}
*/
//database setup
const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "DB2020",
    host: "DESKTOP-E2RKSAU",
    port: 5432,
    database: "postgres",
    //ssl: true
})
//should asynchronization be involved here
//Note: had to place network IP address into postgres configuration file
client.connect()//connect to database
.then( () => console.log("Successful connection") )
.then(() => client.query("SELECT * FROM users"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))//catch errors
//.finally(() => client.end())//ends connection



//execute listening on port 3000
app.listen(3000,()=>{
    console.log("Server listening to 3000");
})


//create user, cart, and book
//delete user, cart, and book
//get user, cart, and book information
//modify user, cart, and book information
