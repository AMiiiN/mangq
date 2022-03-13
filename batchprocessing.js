const { buildQuery } = require("./utils");

const dataSource = "./data/book";

// Read in questions from text file
const fs = require('fs');
var questions = [];
function readQuestions(inputFile) {
    var questions = [];
    fs.readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach(function(line){
        //console.log(line);
        questions.push(line);
    })
    return questions;
}
questions = readQuestions("questions.txt");
console.log(questions.length + " questions loaded.");

// Run routine

const similarityThreshold = 0.85;
const operationTypes = ['avg', 'min', 'max'];

const { identifyOperation, identifyType, identifyFields, identifyInstance } = require("./nlqprocessing");
var { allTypes } = require(dataSource);

var queries = [];
// for each question
for (var i=0; i<questions.length; i++) {

    var { typeLevelNames, fieldLevelNames } = require(dataSource);
    console.log("\nQuestion " + (i+1) + ": " + questions[i]);
    // Find special (aggregated) operation types
    var operationTypeName = identifyOperation(questions[i], 0.95, false);

    var idTypeName;
    var skipType = false;
    // Check if a specific instance has been mentioned
    var specificInstanceFound = false;
    var foundInstance = identifyInstance(questions[i], typeLevelNames, allTypes, similarityThreshold, true);
    if (foundInstance != null) {
        specificInstanceFound = true;    // specific instance has been found
        skipType = true;
        idTypeName = foundInstance.typeName;
    }

    // Find the one with the highest similarity to the user input
    if (skipType == false) {
        var idTypeName = identifyType(questions[i], typeLevelNames, similarityThreshold, false);
        if (idTypeName == null) {
            console.log("Error: No corresponding type found.");
            queries.push("Error: no types found.");
            continue;
        }
    }    

    // Filter the field-level names (keep only the ones that belong to the identified type)
    var idTypeIndex = typeLevelNames.indexOf(idTypeName);
    fieldLevelNames = fieldLevelNames[idTypeIndex];
    console.log(idTypeName);

    // Identify the requested fields
    var idFieldNames = identifyFields(questions[i], fieldLevelNames, similarityThreshold, false);
    if (idFieldNames.length == 0) {
        if (operationTypeName != "count") {
            console.log("Error: No corresponding fields found.");
            queries.push("Error: no fields found.");
            continue;
        }
    }

    // Build the corresponding GraphQL query
    var minimizedQuery = buildQuery(operationTypeName, foundInstance, idTypeName, idFieldNames, true);
    console.log(minimizedQuery);
    queries.push(minimizedQuery);
}

// Write log
var queriesString = '';
for (var i=0; i<queries.length; i++) {
    queriesString += queries[i] + "\n";
}
try {
  const data = fs.writeFileSync('log.txt', queriesString)
  //file written successfully
} catch (err) {
  console.error(err)
}


