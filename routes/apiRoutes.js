// requires the fs package to write to json db
var fs = require("fs");

// links our routes to "data source", db.json
var notesData = require("../db/db.json");


module.exports = function(app) {

    // api get routes
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    })

    // api post request
    app.post("/api/notes", function(req, res) {

        // assigns id according to index in array
        req.body.id = notesData.length + 1;

        // pushes to notesData array then rewrites to db.json
        notesData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(notesData), function(err) {
            if (err) throw err;
        })

        // completes post request
        res.json(true)
    })

    // api delete request
    app.delete("/api/notes/:id", function(req, res) {

        // checks for item in notesData array for the matching user chosen id parameter
        for(const value of notesData) {
            if(value.id == req.params.id) {

                // splices item from notesData array
                var i = notesData.indexOf(value);
                notesData.splice(i, 1);

                // reassigns id according to index in array
                for (var i = 0; i < notesData.length; i++) {
                    notesData[i].id = i + 1;
                }

                // rewrites to db.json
                fs.writeFile("./db/db.json", JSON.stringify(notesData), function(err) {
                    if (err) throw err;
                })

                // completes delete request
                res.json(true);
            }
        }
    })
}