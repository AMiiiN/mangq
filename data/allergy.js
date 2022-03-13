const { gql } = require('apollo-server');
const { stdResolvers } = require('../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Student implements BaseType {
        ID: ID!
        LastName: String
        FirstName: String
        Age: Int
        Sex: String
        Major: Int
        Advisor: Int
        CityCode: String
        Allergies: [Allergy]
    }
    type Allergy implements BaseType {
        ID: ID!
        Name: String
        Type: String
    }
`);

var allergies = [
    {
        "ID": 1,
        "Name": "Eggs",
        "Type": "food",
    },
    {
        "ID": 2,
        "Name": "Nuts",
        "Type": "food",
    },
    {
        "ID": 3,
        "Name": "Milk",
        "Type": "food",
    },
    {
        "ID": 4,
        "Name": "Shellfish",
        "Type": "food",
    },
    {
        "ID": 5,
        "Name": "Anchovies",
        "Type": "food",
    },
    {
        "ID": 6,
        "Name": "Wheat",
        "Type": "food",
    },
    {
        "ID": 7,
        "Name": "Soy",
        "Type": "food",
    },
    {
        "ID": 8,
        "Name": "Ragweed",
        "Type": "environmental",
    },
    {
        "ID": 9,
        "Name": "Tree Pollen",
        "Type": "environmental",
    },
    {
        "ID": 10,
        "Name": "Grass Pollen",
        "Type": "environmental",
    },
    {
        "ID": 11,
        "Name": "Cat",
        "Type": "animal",
    },
    {
        "ID": 12,
        "Name": "Dog",
        "Type": "animal",
    },
    {
        "ID": 13,
        "Name": "Rodent",
        "Type": "animal",
    },
    {
        "ID": 14,
        "Name": "Bee Stings",
        "Type": "animal",
    },
]
var students = [
    {
      "ID": 1001,
      "LastName": 'Smith',
      "FirstName": 'Linda',
      "Age": 18,
      "Sex": 'Female',
      "Major": 600,
      "Advisor": 1121,
      "CityCode": 'BAL',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Cat"))
    },
    {
      "ID": 1002,
      "LastName": 'Kim',
      "FirstName": 'Tracy',
      "Age": 19,
      "Sex": 'Female',
      "Major": 600,
      "Advisor": 7712,
      "CityCode": 'HKG',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Shellfish") || (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1003,
      "LastName": 'Jones',
      "FirstName": 'Shiela',
      "Age": 21,
      "Sex": 'Female',
      "Major": 600,
      "Advisor": 7792,
      "CityCode": 'WAS',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Dog"))
    },
    {
      "ID": 1004,
      "LastName": 'Kumar',
      "FirstName": 'Dinesh',
      "Age": 20,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 8423,
      "CityCode": 'CHI',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts"))
    },
    {
      "ID": 1005,
      "LastName": 'Gompers',
      "FirstName": 'Paul',
      "Age": 26,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 1121,
      "CityCode": 'YYZ',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts") || (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1006,
      "LastName": 'Schultz',
      "FirstName": 'Andy',
      "Age": 18,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 1148,
      "CityCode": 'BAL',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts"))
    },
    {
      "ID": 1007,
      "LastName": 'Apap',
      "FirstName": 'Lisa',
      "Age": 18,
      "Sex": 'Female',
      "Major": 600,
      "Advisor": 8918,
      "CityCode": 'PIT',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Ragweed") || (allgy.Name.includes("Pollen") || (allgy.Name == "Eggs") || (allgy.Name == "Milk") || (allgy.Name == "Shellfish") || (allgy.Name == "Anchovies") || (allgy.Name == "Cat" || (allgy.Name == "Dog"))))
    },
    {
      "ID": 1008,
      "LastName": 'Nelson',
      "FirstName": 'Jandy',
      "Age": 20,
      "Sex": 'Female',
      "Major": 600,
      "Advisor": 9172,
      "CityCode": 'BAL',
      "Allergies": null
    },
    {
      "ID": 1009,
      "LastName": 'Tai',
      "FirstName": 'Eric',
      "Age": 19,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 2192,
      "CityCode": 'YYZ',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1010,
      "LastName": 'Lee',
      "FirstName": 'Derek',
      "Age": 17,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 2192,
      "CityCode": 'HOU',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Ragweed") || (allgy.Name.includes("Pollen") || (allgy.Name == "Eggs") || (allgy.Name == "Milk") || (allgy.Name == "Shellfish") || (allgy.Name == "Anchovies") || (allgy.Name == "Cat" || (allgy.Name == "Dog"))))
    },
    {
      "ID": 1011,
      "LastName": 'Adams',
      "FirstName": 'David',
      "Age": 22,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 1148,
      "CityCode": 'PHL',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Ragweed"))
    },
    {
      "ID": 1012,
      "LastName": 'Davis',
      "FirstName": 'Steven',
      "Age": 20,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 7723,
      "CityCode": 'PIT',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Ragweed"))
    },
    {
      "ID": 1014,
      "LastName": 'Norris',
      "FirstName": 'Charles',
      "Age": 18,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 8741,
      "CityCode": 'DAL',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts"))
    },
    {
      "ID": 1015,
      "LastName": 'Lee',
      "FirstName": 'Susan',
      "Age": 16,
      "Sex": 'Female',
      "Major": 600,
      "Advisor": 8721,
      "CityCode": 'HKG',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts"))
    },
    {
      "ID": 1016,
      "LastName": 'Schwartz',
      "FirstName": 'Mark',
      "Age": 17,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 2192,
      "CityCode": 'DET',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts") || (allgy.Name == "Milk"))
    },
    {
      "ID": 1017,
      "LastName": 'Wilson',
      "FirstName": 'Bruce',
      "Age": 27,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 1148,
      "CityCode": 'LON',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1018,
      "LastName": 'Leighton',
      "FirstName": 'Michael',
      "Age": 20,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 1121,
      "CityCode": 'PIT',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts") || (allgy.Name == "Soy"))
    },
    {
      "ID": 1019,
      "LastName": 'Pang',
      "FirstName": 'Arthur',
      "Age": 18,
      "Sex": 'Male',
      "Major": 600,
      "Advisor": 2192,
      "CityCode": 'WAS',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1020,
      "LastName": 'Thornton',
      "FirstName": 'Ian',
      "Age": 22,
      "Sex": 'Male',
      "Major": 520,
      "Advisor": 7271,
      "CityCode": 'NYC',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1021,
      "LastName": 'Andreou',
      "FirstName": 'George',
      "Age": 19,
      "Sex": 'Male',
      "Major": 520,
      "Advisor": 8722,
      "CityCode": 'NYC',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1022,
      "LastName": 'Woods',
      "FirstName": 'Michael',
      "Age": 17,
      "Sex": 'Male',
      "Major": 540,
      "Advisor": 8722,
      "CityCode": 'PHL',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Anchovies"))
    },
    {
      "ID": 1023,
      "LastName": 'Shieber',
      "FirstName": 'David',
      "Age": 20,
      "Sex": 'Male',
      "Major": 520,
      "Advisor": 8722,
      "CityCode": 'NYC',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Rodent") || (allgy.Name == "Cat") || (allgy.Name == "Nuts"))
    },
    {
      "ID": 1024,
      "LastName": 'Prater',
      "FirstName": 'Stacy',
      "Age": 18,
      "Sex": 'Female',
      "Major": 540,
      "Advisor": 7271,
      "CityCode": 'BAL',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Ragweed") || (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1025,
      "LastName": 'Goldman',
      "FirstName": 'Mark',
      "Age": 18,
      "Sex": 'Male',
      "Major": 520,
      "Advisor": 7134,
      "CityCode": 'PIT',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1026,
      "LastName": 'Pang',
      "FirstName": 'Eric',
      "Age": 19,
      "Sex": 'Male',
      "Major": 520,
      "Advisor": 7134,
      "CityCode": 'HKG',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Grass Pollen"))
    },
    {
      "ID": 1027,
      "LastName": 'Brody',
      "FirstName": 'Paul',
      "Age": 18,
      "Sex": 'Male',
      "Major": 520,
      "Advisor": 8723,
      "CityCode": 'LOS',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1028,
      "LastName": 'Rugh',
      "FirstName": 'Eric',
      "Age": 20,
      "Sex": 'Male',
      "Major": 550,
      "Advisor": 2311,
      "CityCode": 'ROC',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Tree Pollen"))
    },
    {
      "ID": 1029,
      "LastName": 'Han',
      "FirstName": 'Jun',
      "Age": 17,
      "Sex": 'Male',
      "Major": 550,
      "Advisor": 2311,
      "CityCode": 'PEK',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Soy") || (allgy.Name == "Nuts") || (allgy.Name = "Eggs"))
    },
    {
      "ID": 1030,
      "LastName": 'Cheng',
      "FirstName": 'Lisa',
      "Age": 21,
      "Sex": 'Female',
      "Major": 550,
      "Advisor": 2311,
      "CityCode": 'SFO',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Grass Pollen"))
    },
    {
      "ID": 1031,
      "LastName": 'Smith',
      "FirstName": 'Sarah',
      "Age": 20,
      "Sex": 'Female',
      "Major": 550,
      "Advisor": 8772,
      "CityCode": 'PHL',
      "Allergies": allergies.filter((allgy) => (allgy.Name == "Nuts") || (allgy.Name == "Shellfish") || (allgy.Name == "Soy"))
    },
    {
      "ID": 1032,
      "LastName": 'Brown',
      "FirstName": 'Eric',
      "Age": 20,
      "Sex": 'Male',
      "Major": 550,
      "Advisor": 8772,
      "CityCode": 'ATL',
      "Allergies": null
    },
    {
      "ID": 1033,
      "LastName": 'Simms',
      "FirstName": 'William',
      "Age": 18,
      "Sex": 'Male',
      "Major": 550,
      "Advisor": 8772,
      "CityCode": 'NAR',
      "Allergies": null
    },
    {
      "ID": 1034,
      "LastName": 'Epp',
      "FirstName": 'Eric',
      "Age": 18,
      "Sex": 'Male',
      "Major": 50,
      "Advisor": 5718,
      "CityCode": 'BOS',
      "Allergies": null
    },
    {
      "ID": 1035,
      "LastName": 'Schmidt',
      "FirstName": 'Sarah',
      "Age": 26,
      "Sex": 'Female',
      "Major": 50,
      "Advisor": 5718,
      "CityCode": 'WAS',
      "Allergies": null
    }
];

const allTypes = {
    "students": students,
    "allergies": allergies
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
          if (obj.Major) {
              return "Student"
          }
          if (obj.Type) {
              return "Allergy"
          }
        }
    },
    Query: {
        students: (obj, args) => {
            if (args == null) {
                return students;
              }
              else {
                return students.filter((student) => student[args.key] == args.val);
            }
        },
        allergies: (obj, args) => {
            if (args == null) {
                return allergies;
              }
              else {
                return allergies.filter((allergy) => allergy[args.key] == args.val);
            }
        },        
        // standard resolvers
        ...stdResolvers(allTypes),
    }
};

const typeLevelNames = Object.keys(allTypes);
var fieldLevelNames = [];
for (var i=0; i<typeLevelNames.length; i++) {
    fieldLevelNames.push(Object.keys(allTypes[typeLevelNames[i]][0]));
};

module.exports = { schema, resolver, typeLevelNames, fieldLevelNames, allTypes };