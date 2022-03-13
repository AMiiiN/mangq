var prompt = require("prompt-sync")();
var distance = require("jaro-winkler");

function identifyOperation(rawInput, threshold, showInfo) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  var operationNamesAverage = ['average', 'mean', 'typical', 'avg'];
  var operationNamesMax = ['max', 'maximum', 'maximal', 'highest', 'biggest', 'largest', 'most'];
  var operationNamesMin = ['min', 'minimum', 'minimal', 'lowest', 'smallest'];
  var operationNamesSum = ['sum'];
  var operationNamesCount = ['count', 'many'];

  var currentRatings = [];
  var currentDist = [];
  var identifiedOperation = "";

  tokens.forEach( (token) => {

    operationNamesAverage.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'avg';
      }
    });

    operationNamesMin.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'min';
      }
    });

    operationNamesMax.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'max';
      }
    });

    operationNamesSum.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'sum';
      }
    });

    operationNamesCount.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'count';
      }
    });

  });

  return identifiedOperation;  // no special operation type found in the query
}

function identifyType(rawInput, typeNames, threshold, showInfo) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    typeNames.forEach( (typeName) => {
      ratings.push({
        name: typeName,
        token: token,
        similarity: distance(token, typeName.toLowerCase())
      });
    });
  });

  ratings = ratings.filter( (ratedObject) => ratedObject.similarity >= threshold);
  if (showInfo) {
    console.log("Identified types: ");
    console.log(ratings);
  }
  var idTypeName;

  if (ratings.length == 1) {
    idTypeName = ratings[0].name;
  }
  else {
    if (ratings.length < 1) {
      return null;
    }
    else {
      var highestRatedType = ratings[0];
      var max = ratings[0].similarity;
      ratings.forEach( (ratedObject) => {
        if (ratedObject.similarity > max) {
          max = ratedObject.similarity;
          highestRatedType = ratedObject;
        }
      });
      idTypeName = highestRatedType.name;
    }
  }

  return idTypeName;
}

function identifyFields(rawInput, fieldNames, threshold, showInfo) {

  // check for obvious content
  if (rawInput.toLowerCase().includes("all information") || rawInput.toLowerCase().includes("all the information") || rawInput.toLowerCase().includes("all fields")) {
    return fieldNames;
  }

  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    fieldNames.forEach( (fieldName) => {
      ratings.push({
        name: fieldName,
        token: token,
        similarity: distance(token, fieldName.toLowerCase())
      });
    });
  });

  var idFields = [];
  ratings = ratings.filter( (ratedObject) => ratedObject.similarity >= threshold);
  if (showInfo) {
    console.log("Identified fields: ");
    console.log(ratings);
  }
  ratings.forEach( (ratedObject) => {
    idFields.push(ratedObject.name);
  });
  if (idFields.length == 0) {
    if (rawInput.toLowerCase().includes("which")) {
      idFields.push("ID");
      if (fieldNames.includes("Name")) {
        idFields.push("Name");
      }
      else if (fieldNames.includes("name")) {
        idFields.push("name");
      }
    }
    if (rawInput.toLowerCase().includes("old")) {
      if (fieldNames.includes("age"))
        idFields.push("age");
      if (fieldNames.includes("Age"))
        idFields.push("Age");
    }
    if (rawInput.toLowerCase().includes("where")) {
      // if (fieldNames.includes("location"))
      //   idFields.push("location");
      // if (fieldNames.includes("Location"))
      //   idFields.push("Location");
      // if (fieldNames.includes("country"))
      //   idFields.push("country");
      // if (fieldNames.includes("Country"))
      //   idFields.push("Country");
      //   if (fieldNames.includes("city"))
      //   idFields.push("city");
      // if (fieldNames.includes("City"))
      //   idFields.push("City");
      var words_where = ['location', 'country', 'city', 'cities', 'countries', 'place', 'zip'];
      fieldNames.forEach((fld) => {
        words_where.forEach((word) => {
          if (fld.toLowerCase().includes(word)) {
            idFields.push(fld);
          }
        });
      });
    }
    if (rawInput.toLowerCase().includes("list")) {
      fieldNames.forEach((fld) => idFields.push(fld));
    }
  }

  // Remove duplicates
  idFields = removeDuplicates(idFields);
  return idFields;
}

function identifyInstance(rawInput, typeNames, allTypes, threshold, showInfo) {
  
  var instanceFound = false;
  var foundTypeName = "";
  var foundKey = "";
  var foundVal = "";
  var checkTerm = "";
  var keys = [];
  for (var i=0; i<typeNames.length; i++) {
    if (instanceFound) {
      break;
    }
    for (var j=0; j<allTypes[typeNames[i]].length; j++) {
        if (instanceFound) {
          break;
        }
        keys = Object.keys(allTypes[typeNames[i]][j]);
        for (var k=0; k<keys.length; k++) { // k=1 to skip ID
          
          if (instanceFound) {
            break;
          }
          checkTerm = String(allTypes[typeNames[i]][j][keys[k]]);
          if (checkTerm == "") 
            continue;
          var tokens = rawInput.split(" ");
          tokens.forEach((token) => {
            if (token.toLowerCase() == (checkTerm.toLowerCase())) {
              if (showInfo) {
                console.log("Found instance: " + [typeNames[i]] + "(" + checkTerm + ")");
              }
              instanceFound = true;
              foundTypeName = typeNames[i];
              foundVal = checkTerm;
              foundKey = keys[k];
            }
          });
        }
    }
  }

  if (instanceFound) {
    return {
      typeName: foundTypeName,
      key: foundKey,
      val: foundVal
    };
  }
  else {
    return null;
  }

}

/*
function identifySpecificInstance(rawInput, fieldNames, threshold) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    // TODO
    }
  );

  return null; // TODO
}
*/

function cleanTokens(tokens) {
  var new_tokens = [];
  tokens.forEach( (token) => {
    var current_token = token;
    current_token = current_token.toLowerCase();  // bring all tokens to lower case
    // Remove dots, commas, semicolons, brackets
    current_token = current_token.replace(",", "");
    current_token = current_token.replace(";", "");
    current_token = current_token.replace(".", "");
    current_token = current_token.replace("(", "").replace(")", "");
    new_tokens.push(current_token);
  });

  return new_tokens;
}

function removeDuplicates(arr) {
  return arr.filter( (item, pos) => arr.indexOf(item) == pos);
}

module.exports = { identifyOperation, identifyType, identifyFields, identifyInstance };
