// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friendData = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
    var userScore = req.body.scores;
    var scoresArr = [];
    var bestMatch = 0;

    for (var i = 0; i < friendData.length; i++) {
      var scoreDiff = 0;
        for (var j = 0; j < userScore.length; j++) {
          scoreDiff += Math.abs(parseInt(friendData[i].scores[j]) - parseInt(userScore[j]))
          }
          scoresArr.push(scoreDiff);
        }

        // loop through ours scoresArr
        for (var i = 0; i < scoresArr.length; i++) {
          if (scoresArr[i] <= scoresArr[bestMatch]) {
            bestMatch = i;
          }
        }

        // return the best match
        var finalFriend = friendData[bestMatch];
        res.json(finalFriend);
        friendData.push(req.body)
    });

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friendData.length = [];
    res.json({ ok: true });
  });
};
