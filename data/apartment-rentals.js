const { gql } = require('apollo-server');
const { stdResolvers } = require('./../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Building implements BaseType {
        ID: ID!
        Short_name: String
        Name: String
        Description: String
        Address: String
        Manager: String
        Phone: String
    }
    type Apartment implements BaseType {
        ID: ID!
        Building: Building
        Type_code: String
        Number: Int
        Bathrooms: Int
        Bedrooms: Int
        Rooms: Int
        Facilities: [String]
    }
    type Guest implements BaseType {
        ID: ID!
        Gender: Int
        First_name: String
        Last_name: String
        Date_of_birth: String
    }
    type Booking implements BaseType {
        ID: ID!
        Apartment: Apartment
        Guest: Guest
        Status_code: String
        Start_date: String
        End_date: String
    }
    type Query {
        buildings(key: String, val: String): [Building]
        apartments(key: String, val: String): [Apartment]
        guests(key: String, val: String): [Guest]
        bookings(key: String, val: String): [Booking]
        avg(type: String, field: String): Float
        min(type: String, field: String): Float
        max(type: String, field: String): Float
        sum(type: String, field: String): Float
        count(type: String): Int
        getSpecificInstances(type: String, field: String, op: String, value: String): [BaseType]
    }
`);

var buildings = [
    {
        "ID": 0,
        "Short_name": null,
        "Name": null,
        "Description": null,
        "Address": null,
        "Manager": null,
        "Phone": null
    }
];
var apartments = [
    {
        "ID": 0,
        "Building": null,
        "Type_code": null,
        "Number": null,
        "Bathrooms": null,
        "Bedrooms": null,
        "Rooms": null,
        "Facilities": null
    }
];
var guests = [
    {
        "ID": 0,
        "Gender": null,
        "First_name": null,
        "Last_name": null,
        "Date_of_birth": null
    }
];
var bookings = [
    {
        "ID": 0,
        "Apartment": null,
        "Guest": null,
        "Status_code": null,
        "Start_date": null,
        "End_date": null
    }
];
const allTypes = {
    "buildings": buildings,
    "apartments": apartments,
    "guests": guests,
    "bookings": bookings
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
            if (obj.Headquarters) {
                return "Company"
            }
            if (obj.Open_Year) {
                return "GasStation"
            }
        }
    },
    Query: {
        buildings: (obj, args) => {
            if (args == null) {
                return buildings;
              }
              else {
                return buildings.filter((building) => building[args.key] == args.val);
              }
        },
        apartments: (obj, args) => {
            if (args == null) {
                return apartments;
              }
              else {
                return apartments.filter((apartment) => apartment[args.key] == args.val);
              }
        },
        guests: (obj, args) => {
            if (args == null) {
                return guests;
              }
              else {
                return guests.filter((guest) => guest[args.key] == args.val);
              }
        },
        bookings: (obj, args) => {
            if (args == null) {
                return bookings;
              }
              else {
                return bookings.filter((booking) => booking[args.key] == args.val);
              }
        },
        // standard resolvers
        ...stdResolvers(allTypes)
    }
};

const typeLevelNames = Object.keys(allTypes);
var fieldLevelNames = [];
for (var i=0; i<typeLevelNames.length; i++) {
    fieldLevelNames.push(Object.keys(allTypes[typeLevelNames[i]][0]));
};

module.exports = { schema, resolver, typeLevelNames, fieldLevelNames, allTypes };