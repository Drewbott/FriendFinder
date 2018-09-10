// links to the list of data

var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendsData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    console.log("hey")
    /* Code below is to determine the compatability between the client's submission
     to the data in friends array. We are looping through th object and then looping through the scores
     we then have a variable with an assigned value that updates to compare with the absolute value of
     the scores in the array to provide the best match*/

   var userData = req.body;
   var answers = userData.scores;
   var matchDiff = 100;
   var bestMatch;
   
    for (var i = 0; i < friendsData.length; i ++) {
      var current = friendsData[i] 
      var totalDiff = 0;
      for (var j =0; j < current.scores.length; j ++) {
       var absDiff =  Math.abs(answers[j] - current.scores[j])
        totalDiff += absDiff
      }
      
      if (totalDiff < matchDiff) {
        matchDiff = totalDiff;
        bestMatch = current
      }
    }
    res.json(bestMatch);
  });
};
