var path = require("path");
var resultData = require("../public/js/surveyData");

/**
 * This function runs the get and post requests to first get all available results for a user. It this does the logic to take in a user's scores and match the user to the result with the smallest absolute difference
 * @param {array} userScores - this array of numbers represents the user's responses
 * @param {array} resultData - this is an array of objects which represent all of the possible results a user can get
 * @param {number} diff0-diff4 - these are variables created to hold the absolute difference between a user's responses and the results available
 * @param {number} min - this variable holds the minimum of all the absolute differences
 * 
 * @return {object} newFood - this object holds the result the user will receive
 */

module.exports = function (app) {
  app.get("/api/results", function (req, res) {
    res.json(resultData);
  });

  app.post("/api/results", function (req, res) {
    var userScores = JSON.parse(req.body.scores)
    var scoreNums = userScores.map(function (i) {
      return parseInt(i, 10);
    });
    var diff0 = 0;
    var diff1 = 0;
    var diff2 = 0;
    var diff3 = 0;
    var diff4 = 0;
    for (var i = 0; i < scoreNums.length; i++) {
      diff0 += Math.abs(resultData[0].scores[i] - scoreNums[i]);
      diff1 += Math.abs(resultData[1].scores[i] - scoreNums[i]);
      diff2 += Math.abs(resultData[2].scores[i] - scoreNums[i]);
      diff3 += Math.abs(resultData[3].scores[i] - scoreNums[i]);
      diff4 += Math.abs(resultData[4].scores[i] - scoreNums[i]);
    }
    var minDiff = Math.min(diff0, diff1, diff2, diff3, diff4);
    var newFood;
    if (minDiff == diff0) {
      newFood = resultData[0]
    }
    else if (minDiff == diff1) {
      newFood = resultData[1]
    }
    else if (minDiff == diff2) {
      newFood = resultData[2]
    }
    else if (minDiff == diff3) {
      newFood = resultData[3]
    }
    else if (minDiff == diff4) {
      newFood = resultData[4]
    }
    else {
      newFood = resultData[5]
    }
    res.json(newFood);
  });
};
