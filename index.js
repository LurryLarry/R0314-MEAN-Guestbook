const axios = require("axios");
const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public"));
app.use("/api", express.static("api"), function(req, res) {
    // Optional 404 handler
    res.status(404);
    res.json({ error: { code: 404 } });
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/guestbook", function(req, res) {
    res.sendFile(__dirname + "/public/guestbook.html");
});

app.get("/newmessage", function(req, res) {
    res.sendFile(__dirname + "/public/newmessage.html");
});

app.get("/newmessageajax", function(req, res) {
    res.sendFile(__dirname + "/public/newmessageajax.html");
});

app.get("/fetchmessage", function(req, res) {
    res.sendFile(__dirname + "/public/fetchmessage.html");
});

app.get("*", function(req, res) {
    res.send("Cant find the requested page", 404);
});



let data = require(__dirname + "/public/api/data.json");

app.post("/update", function(req, res) {
    let date = new Date();
    date = date.toUTCString();

    let entry = {
        "id": data.length + 1,
        "username": req.body.name,
        "country": req.body.country,
        "date": date,
        "message": req.body.message
    };

    data.push(entry);

    fs.writeFile(__dirname + "/public/api/data.json", JSON.stringify(data), function(err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
    res.sendFile(__dirname + '/public/guestbook.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/update-with-ajax', function(req, res) {
    console.log(req.body.name);

    let date = new Date();
    date = date.toUTCString();

    let entry = {
        "id": data.length + 1,
        "username": req.body.name,
        "country": req.body.country,
        "date": date,
        "message": req.body.message
    };

    data.push(entry);

    fs.writeFile(__dirname + "/public/api/data.json", JSON.stringify(data), function(err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
    res.end();

});

app.listen(PORT, function() {
    console.log("Example app listening on port 8081!");
});