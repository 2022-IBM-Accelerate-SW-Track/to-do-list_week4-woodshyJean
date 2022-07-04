const express = require('express')

const app = express();

const port = process.env.PORT || 5000

const cors = require('cors');

const bodyParser = require('body-parser');
const fs = require('fs');
const { response } = require('express');

app.use(cors());
app.use(bodyParser.json({extended:true}));


app.get("/", (req, res) => {
    res.send({message: "connected to backend server!"});
});

function addItem (req, res){
    let id = req.body.jsonObject.id
    let task = req.body.jsonObject.task
    let curDate = req.body.jsonObject.currentDate
    let dueDate = req.body.jsonObject.dueDate
    
    var newTask = {
        ID:id, 
        Task: task,
        Current_date: curDate,
        Due_date: dueDate
    }

    const jsonString = JSON.stringify(newTask)

    var data = fs.readFileSync('database.json');
    var json = JSON.parse(data);
    json.push(newTask);
    fs.writeFile("database.json", JSON.stringify(json), function(err, result){
        if (err) {console.log('error', err)}
        else {console.log('Successfully wrote to flle')}
    });

    res.send(200)
}

app.post("/add/item", addItem)




app.listen(port, () => console.log("server started on port " + port));

