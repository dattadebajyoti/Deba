var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    userDetails(firstName: String!, lastName: String): [String]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  userDetails: function ({firstName, lastName}) {
    var output = [];
    for (var i = 0; i < 5; i++) {
      output.push(firstName+" "+lastName);
    }
    return output;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4001);
console.log('Running a GraphQL API server at localhost:4001/graphql');
