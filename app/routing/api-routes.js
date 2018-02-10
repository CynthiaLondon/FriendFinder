
var friends = require("../data/friends.js");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    var match = {
      name: "",
      photo: "",
      friendDiff: 1000
    };
    var userData = req.body;
    var userScores = userData.scores;

    var totalDiff = 0;

    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDiff = 0;
      for (var j = 0; j < friends[i].scores[j]; j++) {
        totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        if (totalDiff <= match.friendDiff) {

          match.name = friends[i].name;
          match.photo = friends[i].photo;
          match.friendDiff = totalDiff;
        }
      }
    }
    friends.push(userData);
    res.json(match);

  });

};
