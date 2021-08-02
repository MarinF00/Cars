const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const url = require('url');
const cors = require("cors");
const user = [{
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
}
]
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
const mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cars",
    multipleStatements: true
})
cors.origin

mySqlConnection.connect((err)=> {
    if(!err)
    {
        console.log("DB is connected");

    }
    else
        console.log("DB ERROR")
})



app.listen(8080,() =>
    console.log("Server running on PORT 8080")
)

app.get("/", (req,res)=> {
res.send("Hello world");
})

app.get("/cars", (req,res)=> {
    mySqlConnection.query("SELECT * FROM cars", (err,rows, fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
            console.log(err);
    })
})
app.get("/cars/:id", (req,res)=> {
    mySqlConnection.query("SELECT * FROM cars WHERE id = ?", [req.params.id], (err,rows, fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
            console.log(err);
    })
})

//Delete
app.delete("/cars/:id", (req,res)=> {
    mySqlConnection.query("DELETE FROM cars WHERE id = ?", [req.params.id], (err,rows, fields) => {
        if(!err)
        {
            res.send("Car with id: " + [req.params.id] + "Deleted Successfully");
        }
        else
            console.log(err);
    })
})

//Create and Update
app.post("/cars", (req,res)=> {
    let emp = req.body;

    let sql = "SET @id = ?; SET @name = ?; SET @model = ?; SET @year = ?; SET @color = ?; SET @description = ?; SET @photo = ?; SET @user_id = ?; CALL CarsAddOrEdit(@id,@name,@model,@year,@color,@description,@photo,@user_id)";

    mySqlConnection.query(sql,[emp.id, emp.name, emp.model, emp.year, emp.color,emp.description,emp.photo, emp.user_id], (err,rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor === Array)
                res.redirect("http://localhost:3000/cars")
            });
        else
            console.log(err);
    })
})

//Get Users
app.get("/users", (req,res)=> {
    mySqlConnection.query("SELECT * FROM users", (err,rows, fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
            console.log(err);
    })
})

//Get by ID
app.get("/users/:id", (req,res)=> {
    mySqlConnection.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err,rows, fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
            console.log(err);
    })
})

//Delete from Users
app.delete("/users/:id", (req,res)=> {
    mySqlConnection.query("DELETE FROM users WHERE id = ?", [req.params.id], (err,rows, fields) => {
        if(!err)
        {
            res.send("User with id: " + [req.params.id] + "Deleted Successfully");
        }
        else
            console.log(err);
    })
})

//Post to Users
app.post("/users", (req,res)=> {
    let emp = req.body;

    let sql = "SET @id = ?; SET @first_name = ?; SET @last_name = ?; SET @email = ?; SET @password = ?; CALL UsersAddOrEdit(@id,@first_name,@last_name,@email,@password)";

    mySqlConnection.query(sql,[emp.id, emp.first_name, emp.last_name, emp.email, emp.password], (err,rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor === Array)
                    res.redirect("http://localhost:3000/")
            });
        else
            console.log(err);
    })
})
app.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;


    mySqlConnection.query("SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err,result) => {
        if(err)
        {
            res.send({err:err}) ;
        }

            if(result)
            {

                this.user = result;
                res.redirect("http://localhost:3000/")

            }
            else
            {
                console.log("\"Wrong email/password combination\"")
            }
    })
})
app.get("/user", (req,res)=> {
    res.send(this.user);
})
app.get("/logout", (req,res)=> {
        this.user.id = "";
        this.user.first_name = "";
        this.user.last_name = "";
        this.user.email = "";
        this.user.password = "";
        res.redirect("http://localhost:3000/")
})