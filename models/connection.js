const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://test:hmm@cluster0.bozbu.mongodb.net/test');
client.connect();
const collection = client.db('test').collection('quantiply')

module.exports.collection = collection;

module.exports.findDate = function(){
  collection.createIndex( { date: 1 }, { unique: true } )
  return collection.findOne({"date":new Date().toISOString().slice(0, 10)})
}