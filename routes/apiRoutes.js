var fs = require("fs");
var notesData = require("../db/db.json");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    })

    app.post("/api/notes", function(req, res) {
        notesData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(notesData), function(err) {
            if (err) throw err;
        })
        res.json(true)
    })

    app.delete("/api/notes/:id", function(req, res) {
        var chosen = req.params.id;

        for (var i = 0; i < notesData.length; i++) {
            if (chosen === notesData[i].id) {
                notesData.splice(i, 1);
                res.json(notesData[i]);
            }
        }
    })
}