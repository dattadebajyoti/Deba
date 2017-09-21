var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    firstName: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  firstName: () => {
    return 'Debajyoti';
  },
};

// Run the GraphQL query and print out the response
graphql(schema, '{ firstName }', root).then((response) => {
  console.log(response);
});
