const { gql } = require('apollo-server');
const { stdResolvers } = require('./../stdresolvers');

const schema = gql(`
    interface BaseType {
        ID: ID!
    }
    type Author implements BaseType {
        ID: ID!
        Homepage: String
        Name: String
        Domain: [Domain]
        Organization: Organization
        Publications: [Publication]
        Dummy_author: Int
    }
    type Conference implements BaseType {
        ID: ID!
        Name: String
        Domain: [Domain]
        Dummy_conference: Int
    }
    type Domain implements BaseType {
        ID: ID!
        Name: Text
        Authors: [Author]
        Conferences: [Conference]
        Journals: [Journal]
        Dummy_domain: Int
    }
    type Journal implements BaseType {
        ID: ID!
        Homepage: String
        Name: String
        Domain: [Domain]
        Dummy_journal: Int
    }
    type Keyword implements BaseType {
        ID: ID!
        Keyword: String
        Domain: [Domain]
    }
    type Publication implements BaseType {
        ID: ID!
        Abstract: String
        Conference: Conference
        Number_citations: Int
        Journal: Journal
        Reference_number: Int
        Title: String
        Year: Int
        Domain: [Domain]
        Keywords: [Keyword]
        Authors: [Author]
        Citing: [Publication]
        Citations: [Publication]
    }
    type Organization implements BaseType {
        ID: ID!
        Continent: String
        Homepage: String
        Name: String
    }
    type Query {
        authors(key: String, val: String): [Author]
        conferences(key: String, val: String): [Conference]
        domains(key: String, val: String): [Domain]
        journals(key: String, val: String): [Journal]
        keywords(key: String, val: String): [Keyword]
        publications(key: String, val: String): [Publication]
        organizations(key: String, val: String): [Organization]
        avg(type: String, field: String): Float
        min(type: String, field: String): Float
        max(type: String, field: String): Float
        sum(type: String, field: String): Float
        count(type: String): Int
        getSpecificInstances(type: String, field: String, op: String, value: String): [BaseType]
    }
`);

const authors = [];
const conferences = [];
const publications = [];
const journals = [];
const keywords = [];
const organizations = [];
const domains = [];
const allTypes = {
    "authors": authors,
    "conferences": conferences,
    "publications": publications,
    "journals": journals,
    "keywords": keywords,
    "organizations": organizations,
    "domains": domains
};

const resolver = {
    BaseType: {
        __resolveType(obj, context, info) {
          if (obj.Dummy_author) {
            return "Author"
          }
          if (obj.Dummy_conference) {
            return "Conference"
          }
          if (obj.Dummy_domain) {
            return "Domain"
          }
          if (obj.Dummy_journal) {
              return "Journal"
          }
          if (obj.Keyword) {
              return "Keyword"
          }
          if (obj.Citations) {
              return "Publication"
          }
          if (obj.Continent) {
              return "Organization"
          }
        }
    },
    Query: {
        authors: (obj, args) => {
            if (args == null) {
                return authors;
              }
              else {
                return authors.filter((author) => author[args.key] == args.val);
              }
        },
        conferences: (obj, args) => {
            if (args == null) {
                return conferences;
              }
              else {
                return conferences.filter((conference) => conference[args.key] == args.val);
              }
        },
        journals: (obj, args) => {
            if (args == null) {
                return journals;
              }
              else {
                return journals.filter((journal) => journal[args.key] == args.val);
              }
        },
        domains: (obj, args) => {
            if (args == null) {
                return domains;
              }
              else {
                return domains.filter((domain) => domain[args.key] == args.val);
              }
        },
        keywords: (obj, args) => {
            if (args == null) {
                return keywords;
              }
              else {
                return keywords.filter((keyword) => keyword[args.key] == args.val);
              }
        },
        publications: (obj, args) => {
            if (args == null) {
                return publications;
              }
              else {
                return publications.filter((publication) => publication[args.key] == args.val);
              }
        },
        organizations: (obj, args) => {
            if (args == null) {
                return organizations;
              }
              else {
                return organizations.filter((organization) => organization[args.key] == args.val);
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