var fs = require("fs");
var notesData = require("../db/db.json");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    })

    app.post("/api/notes", function(req, res) {
        req.body.id = notesData.length + 1;
        notesData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(notesData), function(err) {
            if (err) throw err;
        })
        res.json(true)
    })

    app.delete("/api/notes/:id", function(req, res) {
        var chosen = req.params.id;
        
        for(const value of notesData) {
            if(value.id == chosen) {
                var i = notesData.indexOf(value);

                notesData.splice(i, 1);

                for (var i = 0; i < notesData.length; i++) {
                    notesData[i].id = i + 1;
                }

                writeFileAsync("./db/db.json", JSON.stringify(notesData), function(err) {
                    if (err) throw err;
                })
                res.json(true);
            }
        }
    })
}