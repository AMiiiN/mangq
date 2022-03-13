const { gql } = require('apollo-server');
const { stdResolvers } = require('../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Book implements BaseType {
        ID: ID!
        Title: String
        Issues: Int
        Writer: String
        Publication: Publication
    }
    type Publication implements BaseType {
        ID: ID!
        Publisher: String
        Date: String
        Price: Float
    }
`);

var publications = [
    {
        "ID": 1,
        "Publisher": "Pearson",
        "Date": "August 2008",
        "Price": "15000000"
    },
    {
        "ID": 2,
        "Publisher": "Thomson Reuters",
        "Date": "March 2008",
        "Price": 6000000
    },
    {
        "ID": 3,
        "Publisher": "Wiley",
        "Date": "June 2006",
        "Price": 4100000
    },
    {
        "ID": 4,
        "Publisher": "Wiley",
        "Date": "October 2005",
        "Price": 3000000
    },
    {
        "ID": 5,
        "Publisher": "Springer Nature",
        "Date": "August 2008",
        "Price": 3000000
    },
    {
        "ID": 6,
        "Publisher": "Pearson",
        "Date": "March 2007",
        "Price": 2000000
    },
    {
        "ID": 7,
        "Publisher": "Bertelsmann",
        "Date": "April 2007",
        "Price": 2000000
    }
];
var books = [
    {
        "ID": 1,
        "Title": "The Black Lamb",
        "Issues": 6,
        "Writer": "Timothy Truman",
        "Publication": publications.filter((pub) => pub.ID == 1)
    },
    {
        "ID": 2,
        "Title": "Bloody Mary",
        "Issues": 4,
        "Writer": "Garth Ennis",
        "Publication": null
    },
    {
        "ID": 3,
        "Title": "Bloody Mary: Lady Liberty",
        "Issues": 4,
        "Writer": "Garth Ennis",
        "Publication": publications.filter((pub) => pub.ID == 2)
    },
    {
        "ID": 4,
        "Title": "BrainBanx",
        "Issues": 6,
        "Writer": "Elaine Lee",
        "Publication": publications.filter((pub) => pub.ID == 3)
    },
    {
        "ID": 5,
        "Title": "Cyberella",
        "Issues": 12,
        "Writer": "Howard Chaykin",
        "Publication": publications.filter((pub) => pub.ID == 5)
    },
    {
        "ID": 7,
        "Title": "The Dome: Ground Zero",
        "Issues": 1,
        "Writer": "Dave Gibbons",
        "Publication": publications.filter((pub) => pub.ID == 5)
    },
    {
        "ID": 8,
        "Title": "Gemini Blood",
        "Issues": 9,
        "Writer": "Christopher Hinz",
        "Publication": null
    },
    {
        "ID": 9,
        "Title": "Michael Moorcock's Multiverse",
        "Issues": 12,
        "Writer": "Michael Moorcock",
        "Publication": publications.filter((pub) => pub.ID == 6)
    },
    {
        "ID": 10,
        "Title": "Sheva's War",
        "Issues": 5,
        "Writer": "Christopher Moeller",
        "Publication": publications.filter((pub) => pub.ID == 7)
    },
    {
        "ID": 6,
        "Title": "Dead Corps",
        "Issues": 4,
        "Writer": "Christopher Hinz",
        "Publication": null
    }
];

const allTypes = {
    "publications": publications,
    "books": books
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
          if (obj.Issues) {
            return "Book"
          }
          if (obj.Price) {
              return "Publication"
          }
        }
    },
    Query: {
        shops: (obj, args) => {
            if (args == null) {
                return shops;
            }
            else {
                return shops.filter((shop) => shop[args.key] == args.val);
            }
        },
        books: (obj, args) => {
            if (args == null) {
                return books;
            }
            else {
                return books.filter((book) => book[args.key] == args.val);
            }
        },
        publications: (obj, args) => {
            if (args == null) {
                return publications;
            }
            else {
                return publications.filter((pub) => pub[args.key] == args.val);
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