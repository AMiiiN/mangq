const distance = require('jaro-winkler');
const prompt = require("prompt-sync")();
const { identifyOperation, identifyType, identifyFields } = require("./nlqprocessing");
const { buildQuery, buildCurl } = require("./utils");
const https = require('https');
var { typeLevelNames, fieldLevelNames, allTypes } = require('./data/aircraft');

const similarityThreshold = 0.80;
const operationTypes = ['avg', 'min', 'max'];

// Get the user input
var rawInput = prompt("Please enter your query: ");

// Find special (aggregated) operation types
console.log("-------------------------------------------------");
var operationTypeName = identifyOperation(rawInput, 0.9, true);

// Find the one with the highest similarity to the user input
var idTypeName = identifyType(rawInput, typeLevelNames, similarityThreshold, true);
if (idTypeName == null) {
  console.log("\nError: No corresponding type found.");
  return;
}

// Filter the field-level names (keep only the ones that belong to the identified type)
var idTypeIndex = typeLevelNames.indexOf(idTypeName);
fieldLevelNames = fieldLevelNames[idTypeIndex];

// Identify the requested fields
var idFieldNames = identifyFields(rawInput, fieldLevelNames, similarityThreshold, true);
if (idFieldNames.length == 0) {
  console.log("\nError: No corresponding fields found.");
  return;
}

// Notify about the identified types and fields
console.log("\n--> Looking up the fields " + idFieldNames + " in \"" + idTypeName + "\".");

// Build the corresponding GraphQL query
var generatedQuery = buildQuery(operationTypeName, idTypeName, idFieldNames, false);
var minimizedQuery = buildQuery(operationTypeName, idTypeName, idFieldNames, true);
console.log("-------------------------------------------------");
console.log("Generated query: \n\n" + generatedQuery);

// Generate cURL
var generatedCurl = buildCurl(minimizedQuery);
//console.log("Generated curl: \n" + generatedCurl);

const child_process = require('child_process');

function runCmd(cmd)
{
    var resp = child_process.execSync(cmd, {stdio: 'pipe'});
    var result = resp.toString('UTF8');
    return result;
}

var result = runCmd(generatedCurl);
console.log("-------------------------------------------------");
console.log("Result received from GraphQL server: \n");
console.log(result);
console.log("-------------------------------------------------");
