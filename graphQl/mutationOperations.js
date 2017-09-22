// requiring all the necessary modules
var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var ObjectId = require('mongodb').ObjectID;

//connecting to the mongoDB
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // Construct a schema, using GraphQL schema language
  var schema = buildSchema(`
  input MessageInput {
    address: String
    name: String
  }

  type Message {
    id: ID!
    address: String
    name: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

  // If Message had any complex fields, we'd put them on this object.
  class Message {
    constructor(id, address, name) {
      console.log(id);
      console.log(address);
      this.id = id;
      this.address = address;
      this.name = name;
    }
  }

  // Maps username to content
  var fakeDatabase = {};
  var getData;
  var id;
  var root = {
    getMessage: function({
      id
    }) {
      return new Promise((resolve,reject)=>
    {
      db.collection("userInfo").find({
        "_id": ObjectId(id)
      }).toArray(function(err, data) {
        if (err) reject(err);
        if (data.length != 0) {
          console.log("Data found is:" + JSON.stringify(data[0].name));
          resolve(new Message(data[0]._id, data[0].address, data[0].name));
        } else {
          console.log("data not found");
        }
      });
    })


    },
    createMessage: function({
      input
    }) {
      return new Promise((resolve,reject)=>
    {
      db.collection("userInfo").insertOne(input, function(err, doc) {
        if (err) reject(err);
        //getting the id for each data in the database
        id = doc.insertedId;
        console.log(doc.ops[0]);
        resolve(new Message(id, doc.ops[0].address, doc.ops[0].name));
      });
    })

    },
    //function to update
    updateMessage: function({
      id,
      input
    }) {
      console.log(input);
      var newValue = {
        // userId: id,
        userName: input.name,
        userAddress: input.address
      };
      db.collection("userInfo").updateOne({
        "_id": ObjectId(id)
      }, newValue, function(err, res) {
        if (err) throw err;
        console.log("document updated");
      });
      return new Message(id, input);
    },
  };


  var app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));



  app.listen(4002, () => {
    console.log('Running a GraphQL API server at localhost:4002/graphql');
  });
});
