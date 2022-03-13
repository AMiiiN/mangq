const { gql } = require('apollo-server');
const { stdResolvers } = require('../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Building implements BaseType {
        ID: ID!
        Name: String
        City: String
        Height: Int
        Stories: Int
        Status: String
        Companies: [Company]
    }
    type Company implements BaseType {
        ID: ID!
        Name: String
        Headquarters: String
        Industry: String
        Sales: Float
        Profits: Float
        Assets: Float
        Market_Value: Float
        Buildings: [Building]
    }
`);

var companies = [];
var buildings = [
    {
        "ID": 1,
        "Name": "Torre KOI",
        "City": "Monterrey",
        "Height": 220,
        "Stories": 67,
        "Status": "under construction",
        "Companies": companies.filter((obj) => obj.ID == 1)
    },
    {
        "ID": 2,
        "Name": "Torre Mitikah",
        "City": "Mexico City",
        "Height": 210,
        "Stories": 60,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 2) || (obj.ID == 11))
    },
    {
        "ID": 3,
        "Name": "Punto Chapultepec",
        "City": "Mexico City",
        "Height": 210,
        "Stories": 59,
        "Status": "proposed",
        "Companies": companies.filter((obj) => (obj.ID == 4) || (obj.ID == 2) || (obj.ID == 11) || (obj.ID == 9))
    },
    {
        "ID": 4,
        "Name": "Torre Reforma",
        "City": "Mexico City",
        "Height": 330,
        "Stories": 57,
        "Status": "under construction",
        "Companies": companies.filter((obj) => obj.ID == 3)
    },
    {
        "ID": 5,
        "Name": "Corporativo BBVA Bancomer",
        "City": "Mexico City",
        "Height": 220,
        "Stories": 50,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 3) || (obj.ID == 7))
    },
    {
        "ID": 6,
        "Name": "Reforma 432",
        "City": "Mexico City",
        "Height": 300,
        "Stories": 100,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 9) )
    },
    {
        "ID": 7,
        "Name": "Torre New York Life",
        "City": "Mexico City",
        "Height": 50,
        "Stories": 6,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 4) )
    },
    {
        "ID": 8,
        "Name": "LIU East",
        "City": "Monterrey",
        "Height": 73,
        "Stories": 20,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 19) )
    },
    {
        "ID": 9,
        "Name": "Residencial Vidalta Torre Altaire 2",
        "City": "Mexico City",
        "Height": 150,
        "Stories": 44,
        "Status": "on-hold",
        "Companies": companies.filter((obj) => (obj.ID == 10) )
    },
    {
        "ID": 10,
        "Name": "Residencial Vidalta Torre Altaire 3",
        "City": "Mexico City",
        "Height": 200,
        "Stories": 44,
        "Status": "on-hold",
        "Companies": companies.filter((obj) => (obj.ID == 9) )
    },
    {
        "ID": 11,
        "Name": "Reforma 90",
        "City": "Mexico City",
        "Height": 200,
        "Stories": 42,
        "Status": "on-hold",
        "Companies": companies.filter((obj) => (obj.ID == 5) )
    },
    {
        "ID": 12,
        "Name": "Ritz-Carlton Mexico City",
        "City": "Mexico City",
        "Height": 100,
        "Stories": 34,
        "Status": "on-hold",
        "Companies": null
    }
];
companies = [
    {
        "ID": 1,
        "Name": "JPMorgan Chase",
        "Headquarters": "USA",
        "Industry": "Banking",
        "Sales": 115.5,
        "Profits": 17.4,
        "Assets": 2117.6,
        "Market_Value": 182.2,
        "Buildings": buildings.filter(obj => (obj.ID == 1) )
    },
    {
        "ID": 2,
        "Name": "HSBC",
        "Headquarters": "UK",
        "Industry": "Banking",
        "Sales": 103.3,
        "Profits": 13.3,
        "Assets": 2467.9,
        "Market_Value": 186.5,
        "Buildings": buildings.filter(obj => (obj.ID == 2) || (obj.ID == 3) )
    },
    {
        "ID": 3,
        "Name": "General Electric",
        "Headquarters": "USA",
        "Industry": "Conglomerate",
        "Sales": 156.2,
        "Profits": 11.6,
        "Assets": 751.2,
        "Market_Value": 216.2,
        "Buildings": buildings.filter(obj => (obj.ID == 4) || (obj.ID == 5) )
    },
    {
        "ID": 4,
        "Name": "ExxonMobil",
        "Headquarters": "USA",
        "Industry": "Oil and gas",
        "Sales": 341.6,
        "Profits": 30.5,
        "Assets": 302.5,
        "Market_Value": 407.2,
        "Buildings": buildings.filter(obj => (obj.ID == 3) || (obj.ID == 7) )
    },
    {
        "ID": 5,
        "Name": "Royal Dutch Shell",
        "Headquarters": "Netherlands",
        "Industry": "Oil and gas",
        "Sales": 369.1,
        "Profits": 20.1,
        "Assets": 317.2,
        "Market_Value": 212.9,
        "Buildings": buildings.filter(obj => (obj.ID == 11) )
    },
    {
        "ID": 6,
        "Name": "PetroChina",
        "Headquarters": "China",
        "Industry": "Oil and gas",
        "Sales": 223.3,
        "Profits": 21.2,
        "Assets": 251.3,
        "Market_Value": 320.8,
        "Buildings": null
    },
    {
        "ID": 7,
        "Name": "Industrial and Commercial Bank of China",
        "Headquarters": "China",
        "Industry": "Banking",
        "Sales": 69.2,
        "Profits": 18.8,
        "Assets": 1723.5,
        "Market_Value": 239.5,
        "Buildings": buildings.filter(obj => (obj.ID == 5) )
    },
    {
        "ID": 8,
        "Name": "Berkshire Hathaway",
        "Headquarters": "USA",
        "Industry": "Conglomerate",
        "Sales": 136.2,
        "Profits": 13,
        "Assets": 372.2,
        "Market_Value": 211,
        "Buildings": null
    },
    {
        "ID": 9,
        "Name": "Petrobras",
        "Headquarters": "Brazil",
        "Industry": "Oil and gas",
        "Sales": 121.3,
        "Profits": 21.2,
        "Assets": 313.2,
        "Market_Value": 238.8,
        "Buildings": buildings.filter(obj => (obj.ID == 3) || (obj.ID == 6) || (obj.ID == 10))
    },
    {
        "ID": 10,
        "Name": "Citigroup",
        "Headquarters": "USA",
        "Industry": "Banking",
        "Sales": 111.5,
        "Profits": 10.6,
        "Assets": 1913.9,
        "Market_Value": 132.8,
        "Buildings": buildings.filter(obj => (obj.ID == 9) )
    },
    {
        "ID": 11,
        "Name": "BNP Paribas",
        "Headquarters": "France",
        "Industry": "Banking",
        "Sales": 130.4,
        "Profits": 10.5,
        "Assets": 2680.7,
        "Market_Value": 88,
        "Buildings": buildings.filter(obj => (obj.ID == 2) || (obj.ID == 3))
    },
    {
        "ID": 12,
        "Name": "Wells Fargo",
        "Headquarters": "USA",
        "Industry": "Banking",
        "Sales": 93.2,
        "Profits": 12.4,
        "Assets": 1258.1,
        "Market_Value": 170.6,
        "Buildings": null
    },
    {
        "ID": 13,
        "Name": "Santander Group",
        "Headquarters": "Spain",
        "Industry": "Banking",
        "Sales": 109.7,
        "Profits": 12.8,
        "Assets": 1570.6,
        "Market_Value": 94.7,
        "Buildings": null
    },
    {
        "ID": 14,
        "Name": "AT&T Inc.",
        "Headquarters": "USA",
        "Industry": "Telecommunications",
        "Sales": 124.3,
        "Profits": 19.9,
        "Assets": 268.5,
        "Market_Value": 168.2,
        "Buildings": null
    },
    {
        "ID": 15,
        "Name": "Gazprom",
        "Headquarters": "Russia",
        "Industry": "Oil and gas",
        "Sales": 98.7,
        "Profits": 25.7,
        "Assets": 275.9,
        "Market_Value": 172.9,
        "Buildings": null
    },
    {
        "ID": 16,
        "Name": "Chevron",
        "Headquarters": "USA",
        "Industry": "Oil and gas",
        "Sales": 189.6,
        "Profits": 19,
        "Assets": 184.8,
        "Market_Value": 200.6,
        "Buildings": null
    },
    {
        "ID": 17,
        "Name": "China Construction Bank",
        "Headquarters": "China",
        "Industry": "Banking",
        "Sales": 58.2,
        "Profits": 15.6,
        "Assets": 1408,
        "Market_Value": 224.8,
        "Buildings": null
    },
    {
        "ID": 18,
        "Name": "Walmart",
        "Headquarters": "USA",
        "Industry": "Retailing",
        "Sales": 421.8,
        "Profits": 16.4,
        "Assets": 180.7,
        "Market_Value": 187.3,
        "Buildings": null
    },
    {
        "ID": 19,
        "Name": "Total",
        "Headquarters": "France",
        "Industry": "Oil and gas",
        "Sales": 188.1,
        "Profits": 14.2,
        "Assets": 192.8,
        "Market_Value": 138,
        "Buildings": buildings.filter(obj => (obj.ID == 8) )
    },

];
buildings = [
    {
        "ID": 1,
        "Name": "Torre KOI",
        "City": "Monterrey",
        "Height": 220,
        "Stories": 67,
        "Status": "under construction",
        "Companies": companies.filter((obj) => obj.ID == 1)
    },
    {
        "ID": 2,
        "Name": "Torre Mitikah",
        "City": "Mexico City",
        "Height": 210,
        "Stories": 60,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 2) || (obj.ID == 11))
    },
    {
        "ID": 3,
        "Name": "Punto Chapultepec",
        "City": "Mexico City",
        "Height": 210,
        "Stories": 59,
        "Status": "proposed",
        "Companies": companies.filter((obj) => (obj.ID == 4) || (obj.ID == 2) || (obj.ID == 11) || (obj.ID == 9))
    },
    {
        "ID": 4,
        "Name": "Torre Reforma",
        "City": "Mexico City",
        "Height": 330,
        "Stories": 57,
        "Status": "under construction",
        "Companies": companies.filter((obj) => obj.ID == 3)
    },
    {
        "ID": 5,
        "Name": "Corporativo BBVA Bancomer",
        "City": "Mexico City",
        "Height": 220,
        "Stories": 50,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 3) || (obj.ID == 7))
    },
    {
        "ID": 6,
        "Name": "Reforma 432",
        "City": "Mexico City",
        "Height": 300,
        "Stories": 100,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 9) )
    },
    {
        "ID": 7,
        "Name": "Torre New York Life",
        "City": "Mexico City",
        "Height": 50,
        "Stories": 6,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 4) )
    },
    {
        "ID": 8,
        "Name": "LIU East",
        "City": "Monterrey",
        "Height": 73,
        "Stories": 20,
        "Status": "under construction",
        "Companies": companies.filter((obj) => (obj.ID == 19) )
    },
    {
        "ID": 9,
        "Name": "Residencial Vidalta Torre Altaire 2",
        "City": "Mexico City",
        "Height": 150,
        "Stories": 44,
        "Status": "on-hold",
        "Companies": companies.filter((obj) => (obj.ID == 10) )
    },
    {
        "ID": 10,
        "Name": "Residencial Vidalta Torre Altaire 3",
        "City": "Mexico City",
        "Height": 200,
        "Stories": 44,
        "Status": "on-hold",
        "Companies": companies.filter((obj) => (obj.ID == 9) )
    },
    {
        "ID": 11,
        "Name": "Reforma 90",
        "City": "Mexico City",
        "Height": 200,
        "Stories": 42,
        "Status": "on-hold",
        "Companies": companies.filter((obj) => (obj.ID == 5) )
    },
    {
        "ID": 12,
        "Name": "Ritz-Carlton Mexico City",
        "City": "Mexico City",
        "Height": 100,
        "Stories": 34,
        "Status": "on-hold",
        "Companies": null
    }
];

const allTypes = {
    "companies": companies,
    "buildings": buildings
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
          if (obj.Headquarters) {
              return "Company";
          }
          if (obj.Height) {
              return "Building";
          }
        }
    },
    Query: {
        companies: (obj, args) => {
            if (args == null) {
                return companies;
            }
            else {
                return companies.filter((company) => company[args.key] == args.val);
            }
        },
        buildings: (obj, args) => {
            if (args == null) {
                return buildings;
            }
            else {
                return buildings.filter((building) => building[args.key] == args.val);
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