var friends = require("../data/friends");

module.exports = function(app) {
  // Return data in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // Receive user details
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var bfIndex = 0;
    var minDiff = 40;

  
    for(var i = 0; i < friends.length; i++) {
      var totDiff = 0;

      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totDiff += difference;
      }

      // change bf index and set the new min for next iteration comparison 
      if(totDiff < minDiff) {
        bfIndex = i;
        minDiff = totDiff;
      }
    }

    // after finding match, add user to friend array
    friends.push(user);

    // send back to browser the best friend match
    res.json(friends[bfIndex]);
  });
};