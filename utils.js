//const fs = require('fs');
//var { graphql, buildSchema } = require('graphql');
const { gql } = require('apollo-server');

/*function buildSchemaFromPath(path) {
  var input_data = fs.readFileSync(path).toString();
  var schema = buildSchema(input_data);
  return schema;
}

function buildApolloSchemaFromPath(path) {
  var input = fs.readFileSync(path).toString();
  var schema = gql(input);
  return schema;
}*/

function buildQuery(operationTypeName, foundInstance, typeName, fieldNames, minimize) {
  var query = "";
  var specialOperationRequired = ((operationTypeName != ""));

  // Build minimized query ///////////////////////////
  if (minimize) {

    // check if a special operation is queried
    if (specialOperationRequired) {
      // count requires only 1 argument
      if (operationTypeName == "count") {
        query = 'query MyQuery { ' + operationTypeName + '(type: \"' + typeName + '\") }';
      }
      else {
        query = 'query MyQuery { ' + operationTypeName + '(type: \"' + typeName + '\", field: \"' + fieldNames[0] + '\") }';
      }
    }
    else {
      if (foundInstance == null) {
        query = "query MyQuery { " + typeName + " { ";
        fieldNames.forEach( (fieldName) => {
          query += fieldName;
          if (fieldNames[fieldNames.length-1] != fieldName) {
            query += ", ";
          }
        });
        query += " } }";
      }
      else {
        query = "query MyQuery { " + typeName + "(key: \"" + foundInstance.key + "\", val: \"" + foundInstance.val + "\") { ";
        fieldNames.forEach ( (fieldName) => {
          query += fieldName;
          if (fieldNames[fieldNames.length-1] != fieldName) {
            query += ", ";
          }
        });
        query += " } }";
      }
    }

  }

  // Build full query /////////////////////////////
  else {

    // check if a special operation is queried
    if (specialOperationRequired) {
      query = "query MyQuery {\n\t" + operationTypeName + '(type: \"' + typeName + "\", field: \"" + fieldNames[0] + "\")";
      query += "\n}";
    }
    else {
      var query = "query MyQuery {\n";
      query += "\t " + typeName + " {";
      fieldNames.forEach( (fieldName) => {
        query += "\n\t\t" + fieldName;
      });
      query += "\n\t}\n}";
    }
  }
  return query;
}

function buildCurl(query) {
  var curl = `curl --request POST \\
  --header 'content-type: application/json' \\
  --url http://localhost:4000/ \\
  --data '{"query":"`; //XXX"}'`;
  curl += query + "\"}'";
  return curl;
}

/*module.exports = { buildSchemaFromPath, buildApolloSchemaFromPath,
  buildQuery, buildCurl };*/
module.exports = { buildQuery, buildCurl };
