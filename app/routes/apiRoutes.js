// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
var path = require("path");
var resultData = require("../public/js/surveyData");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function (app) {

  // ---------------------------------------------------------------------------
  app.get("/api/results", function (req, res) {
    res.json(resultData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
  app.post("/api/results", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

    var userScores = JSON.parse(req.body.scores)
    var scoreNums = userScores.map(function (i) {
      return parseInt(i, 10);
    });
    var absVal0 = 0;
    var absVal1 = 0;
    var absVal2 = 0;
    var absVal3 = 0;
    var absVal4 = 0;
    var absVal5 = 0;
    var absVal6 = 0;

    for (var i = 0; i < scoreNums.length; i++) {
      absVal0 = Math.abs(resultData[0].scores[i] - scoreNums[i]);
      console.log("0", absVal0);
      absVal1 = Math.abs(resultData[1].scores[i] - scoreNums[i]);
      console.log("1", absVal1);
      absVal2 += Math.abs(resultData[2].scores[i] - scoreNums[i]);
      console.log("2", absVal2);
      absVal3 += Math.abs(resultData[3].scores[i] - scoreNums[i]);
      absVal4 += Math.abs(resultData[4].scores[i] - scoreNums[i]);
      absVal5 += Math.abs(resultData[5].scores[i] - scoreNums[i]);
      absVal6 += Math.abs(resultData[6].scores[i] - scoreNums[i]);
    }

    var newFood;
    var match = Math.min(absVal0, absVal1, absVal2, absVal3, absVal4, absVal5, absVal6);
    console.log("match", match);
    if (match == absVal0) {
      newFood = resultData[0]
    }
    else if (match == absVal1) {
      newFood = resultData[1]
    }
    else if (match == absVal2) {
      newFood = resultData[2]
    }
    else if (match == absVal3) {
      newFood = resultData[3]
    }
    else if (match == absVal4) {
      newFood = resultData[4]
    }
    else if (match == absVal5) {
      newFood = resultData[5]
    }
    else if (match == absVal6) {
      newFood = resultData[6]
    }
    res.json(newFood);
  });
  app.post("/api/clear", function () {
    res.destroy({});
  });
};
