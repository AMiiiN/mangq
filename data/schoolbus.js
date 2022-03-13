const { gql } = require('apollo-server');
const { stdResolvers } = require('../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Driver implements BaseType {
        ID: ID!
        Name: String
        Party: String
        Home_City: String
        Age: Int
        Years_Working: Int
        Full_Time: Boolean
        Bus: Bus
    }
    type School implements BaseType {
        ID: ID!
        Grade: String
        Name: Text
        Location: Text
        Type: Text
        Bus: Bus
    }
    type Bus implements BaseType {
        ID: ID!
        School: School
        Driver: Driver
        Years_Working: Int
        Full_Time: Boolean
    }
`);

var drivers = [
    {
        "ID": 1,
        "Name": "Matthew Ritter",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 40,
        "Bus": null
    },
    {
        "ID": 2,
        "Name": "Dan Carter",
        "Party": "Rep",
        "Home_City": "Bethel",
        "Age": 30,
        "Bus": null
    },
    {
        "ID": 3,
        "Name": "Minnie Gonzalez",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 46,
        "Bus": null
    },
    {
        "ID": 4,
        "Name": "Angel Acre",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 42,
        "Bus": null
    },
    {
        "ID": 5,
        "Name": "Brandon McGee",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 45,
        "Bus": null
    },
    {
        "ID": 6,
        "Name": "Edwin Vargas",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 52,
        "Bus": null
    },
    {
        "ID": 7,
        "Name": "Douglas McCrory",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 36,
        "Bus": null
    },
    {
        "ID": 8,
        "Name": "Timothy Ackert",
        "Party": "Rep",
        "Home_City": "Coventry",
        "Age": 35,
        "Bus": null
    },
    {
        "ID": 9,
        "Name": "Jason Rojas",
        "Party": "Dem",
        "Home_City": "East Hartford",
        "Age": 38,
        "Bus": null
    },
    {
        "ID": 10,
        "Name": "Henry Genga",
        "Party": "Dem",
        "Home_City": "East Hartford",
        "Age": 37,
        "Bus": null
    },
    {
        "ID": 11,
        "Name": "Tim Larson",
        "Party": "Dem",
        "Home_City": "East Hartford",
        "Age": 36,
        "Bus": null
    },
    {
        "ID": 12,
        "Name": "Geoff Luxenberg",
        "Party": "Dem",
        "Home_City": "Manchester",
        "Age": 52,
        "Bus": null
    }
];
var schools = [
    {
        "ID": 1,
        "Grade": "Kindergarten",
        "Name": "Noelani Elementary ",
        "Location": "Honolulu, Hawaii",
        "Type": "Public",
        "Bus": null,
    },
    {
        "ID": 2,
        "Grade": "1st-3rd grade",
        "Name": "St. Francis Assisi",
        "Location": "Jakarta, Indonesia",
        "Type": "Private Catholic",
        "Bus": null,
    },
    {
        "ID": 3,
        "Grade": "4th grade",
        "Name": "State Elementary School Menteng 01",
        "Location": "Jakarta, Indonesia",
        "Type": "Public",
        "Bus": null,
    },
    {
        "ID": 4,
        "Grade": "5th-12th grade",
        "Name": "Punahou School",
        "Location": "Honolulu, Hawaii",
        "Type": "Private",
        "Bus": null,
    },
    {
        "ID": 5,
        "Grade": "Freshman-Sophomore year",
        "Name": "Occidental College",
        "Location": "Los Angeles, California",
        "Type": "Private",
        "Bus": null,
    },
    {
        "ID": 6,
        "Grade": "Junior-Senior year",
        "Name": "Columbia University",
        "Location": "New York City",
        "Type": "Private",
        "Bus": null,
    },
    {
        "ID": 7,
        "Grade": "College",
        "Name": "Harvard Law School",
        "Location": "Cambridge, Massachusetts",
        "Type": "Private",
        "Bus": null,
    }
];
var busses = [
    {
        "ID": 1,
        "School": schools.filter(obj => obj.ID == 1)[0],
        "Driver": drivers.filter(obj => obj.ID == 10)[0],
        "Years_Working": 10,
        "Full_Time": false
    },
    {
        "ID": 2,
        "School": schools.filter(obj => obj.ID == 5)[0],
        "Driver": drivers.filter(obj => obj.ID == 7)[0],
        "Years_Working": 8,
        "Full_Time": true
    },
    {
        "ID": 3,
        "School": schools.filter(obj => obj.ID == 3)[0],
        "Driver": drivers.filter(obj => obj.ID == 4)[0],
        "Years_Working": 6,
        "Full_Time": true
    },
    {
        "ID": 4,
        "School": schools.filter(obj => obj.ID == 7)[0],
        "Driver": drivers.filter(obj => obj.ID == 9)[0],
        "Years_Working": 2,
        "Full_Time": true
    },
    {
        "ID": 5,
        "School": schools.filter(obj => obj.ID == 4)[0],
        "Driver": drivers.filter(obj => obj.ID == 3)[0],
        "Years_Working": 3,
        "Full_Time": true
    }
];
drivers = [
    {
        "ID": 1,
        "Name": "Matthew Ritter",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 40,
        "Bus": null
    },
    {
        "ID": 2,
        "Name": "Dan Carter",
        "Party": "Rep",
        "Home_City": "Bethel",
        "Age": 30,
        "Bus": null
    },
    {
        "ID": 3,
        "Name": "Minnie Gonzalez",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 46,
        "Bus": busses.filter(bus => bus.ID == 5)[0]
    },
    {
        "ID": 4,
        "Name": "Angel Acre",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 42,
        "Bus": busses.filter(bus => bus.ID == 3)[0]
    },
    {
        "ID": 5,
        "Name": "Brandon McGee",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 45,
        "Bus": null
    },
    {
        "ID": 6,
        "Name": "Edwin Vargas",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 52,
        "Bus": null
    },
    {
        "ID": 7,
        "Name": "Douglas McCrory",
        "Party": "Dem",
        "Home_City": "Hartford",
        "Age": 36,
        "Bus": busses.filter(bus => bus.ID == 2)[0]
    },
    {
        "ID": 8,
        "Name": "Timothy Ackert",
        "Party": "Rep",
        "Home_City": "Coventry",
        "Age": 35,
        "Bus": null
    },
    {
        "ID": 9,
        "Name": "Jason Rojas",
        "Party": "Dem",
        "Home_City": "East Hartford",
        "Age": 38,
        "Bus": busses.filter(bus => bus.ID == 4)[0]
    },
    {
        "ID": 10,
        "Name": "Henry Genga",
        "Party": "Dem",
        "Home_City": "East Hartford",
        "Age": 37,
        "Bus": busses.filter(bus => bus.ID == 1)[0]
    },
    {
        "ID": 11,
        "Name": "Tim Larson",
        "Party": "Dem",
        "Home_City": "East Hartford",
        "Age": 36,
        "Bus": null
    },
    {
        "ID": 12,
        "Name": "Geoff Luxenberg",
        "Party": "Dem",
        "Home_City": "Manchester",
        "Age": 52,
        "Bus": null
    }
];
schools = [
    {
        "ID": 1,
        "Grade": "Kindergarten",
        "Name": "Noelani Elementary School",
        "Location": "Honolulu, Hawaii",
        "Type": "Public",
        "Bus": busses.filter(bus => bus.ID == 1)[0]
    },
    {
        "ID": 2,
        "Grade": "1st-3rd grade",
        "Name": "St. Francis Assisi",
        "Location": "Jakarta, Indonesia",
        "Type": "Private Catholic",
        "Bus": null,
    },
    {
        "ID": 3,
        "Grade": "4th grade",
        "Name": "State Elementary School Menteng 01",
        "Location": "Jakarta, Indonesia",
        "Type": "Public",
        "Bus": busses.filter(bus => bus.ID == 3)[0]
    },
    {
        "ID": 4,
        "Grade": "5th-12th grade",
        "Name": "Punahou School",
        "Location": "Honolulu, Hawaii",
        "Type": "Private",
        "Bus": busses.filter(bus => bus.ID == 5)[0]
    },
    {
        "ID": 5,
        "Grade": "Freshman-Sophomore year",
        "Name": "Occidental College",
        "Location": "Los Angeles, California",
        "Type": "Private",
        "Bus": busses.filter(bus => bus.ID == 2)[0]
    },
    {
        "ID": 6,
        "Grade": "Junior-Senior year",
        "Name": "Columbia University",
        "Location": "New York City",
        "Type": "Private",
        "Bus": null,
    },
    {
        "ID": 7,
        "Grade": "College",
        "Name": "Harvard Law School",
        "Location": "Cambridge, Massachusetts",
        "Type": "Private",
        "Bus": busses.filter(bus => bus.ID == 4)[0]
    }
];

const allTypes = {
    "drivers": drivers,
    "schools": schools,
    "busses": busses
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
          if (obj.Party) {
              return "Driver";
          }
          if (obj.Grade) {
              return "School";
          }
          if (obj.Years_Working) {
              return "Bus"
          }
        }
    },
    Query: {
        schools: (obj, args) => {
            if (args == null) {
                return schools;
            }
            else {
                return schools.filter((school) => school[args.key] == args.val);
            }
        },
        drivers: (obj, args) => {
            if (args == null) {
                return drivers;
            }
            else {
                return drivers.filter((driver) => driver[args.key] == args.val);
            }
        },
        busses: (obj, args) => {
            if (args == null) {
                return busses;
            }
            else {
                return busses.filter((bus) => bus[args.key] == args.val);
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