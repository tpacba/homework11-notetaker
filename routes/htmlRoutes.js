// requires the path package to get the correct file for our htmls
var path = require("path");

module.exports = function(app) {

    // html get request for notes
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // html get request for home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}