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

var annos = [];
function readQuestions(inputFile) {
    var annos = [];
    fs.readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach(function(line){
        //console.log(line);
        annos.push(line);
    })
    return annos;
}
annos = readQuestions("annos.txt");
console.log("Annos loaded: " + annos.length);

var cats = [];
function readQuestions(inputFile) {
    var cats = [];
    fs.readFileSync(inputFile, 'utf-8').split(/\r?\n/).forEach(function(line){
        //console.log(line);
        cats.push(line);
    })
    return cats;
}
cats = readQuestions("cats.txt");
console.log("Category labels loaded: " + cats.length);

var total_tokens = 0;
var tokens = [];
var ind = 0;
var consideredQuests = 0;
var cat2corrects = 0;
var cat1corrects = 0;
var cat3corrects = 0;
var cat4corrects = 0;
var cat5corrects = 0;
var cattotals = [0,0,0,0,0];
questions.forEach((quest) => {
    if ((!annos[ind].toLowerCase().includes("follow")) && (!annos[ind].toLowerCase().includes("dupli")) && (!annos[ind].toLowerCase().includes("task"))) {
        tokens = quest.split(" ");
        tokens = cleanTokens(tokens);
        total_tokens += tokens.length;
        consideredQuests++;
        if (cats[ind].toLowerCase().includes("1"))
            cattotals[0]++;
        if (cats[ind].toLowerCase().includes("2"))
            cattotals[1]++;
        if (cats[ind].toLowerCase().includes("3"))
            cattotals[2]++;
        if (cats[ind].toLowerCase().includes("4"))
            cattotals[3]++;
        if (cats[ind].toLowerCase().includes("5"))
            cattotals[4]++;
        if (annos[ind].toLowerCase().includes("success")) {
            if (cats[ind].toLowerCase().includes("1"))
                cat1corrects++;
            if (cats[ind].toLowerCase().includes("2"))
                cat2corrects++;
            if (cats[ind].toLowerCase().includes("3"))
                cat3corrects++;
            if (cats[ind].toLowerCase().includes("4"))
                cat4corrects++;
            if (cats[ind].toLowerCase().includes("5"))
                cat5corrects++;
        }
    }
    ind++;
});

console.log("Considered questions: " + consideredQuests);
console.log("Average tokens per question: " + (total_tokens/consideredQuests));
console.log("Number correct category 1: " + cat1corrects + " out of " + cattotals[0] + " (" + (cat1corrects/cattotals[0])*100 + "%)");
console.log("Number correct category 2: " + cat2corrects + " out of " + cattotals[1] + " (" + (cat2corrects/cattotals[1])*100 + "%)");
console.log("Number correct category 3: " + cat3corrects + " out of " + cattotals[2] + " (" + (cat3corrects/cattotals[2])*100 + "%)");
console.log("Number correct category 4: " + cat4corrects + " out of " + cattotals[3] + " (" + (cat4corrects/cattotals[3])*100 + "%)");
console.log("Number correct category 5: " + cat5corrects + " out of " + cattotals[4] + " (" + (cat5corrects/cattotals[4])*100 + "%)");

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