const express = require('express');
const sqldb = require('./connection/database');

const app = express();

function getPerson() {
    sqldb.execute("SELECT * FROM Person").then(([rows, fileData]) => {
        console.log(rows);
    });
}

function insert() {
    // const query = "INSERT INTO Person(Full_name, Age, City, Gender) VALUES(?, ?, ?, ?)";
    // const values = ["Mohit", 22, "Noida", "Male"];
    sqldb
    .execute(
        "INSERT INTO Person(Full_name, Age, City, Gender) VALUES(?, ?, ?, ?)",
        ["Rahul", 32, "Sikandarapur", "Male"]
    )
    .then((result) => {
        console.log(result);
    });
}

function findById(id) {
    sqldb.execute("SELECT * FROM Person WHERE Person.idPerson = ?", [id])
    .then(([row, fileData]) => {
        console.log(row);
    })
    .catch((err) => console.log(err));
}

function deleteById(id) {
    sqldb.execute("DELETE FROM Person WHERE Person.idPerson = ?", [id])
    .then(([row, fileData]) => {
        console.log(row);
    })
    .catch((err) => console.log(err));
}
// insert();

getPerson();
// findById(5);
// deleteById(5);

app.use((req, res, next) => {
    res.write('<h1>Hello with SQL</h1>');

})

app.listen(4000);
