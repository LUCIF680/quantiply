const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://test:hmm@cluster0.bozbu.mongodb.net/test');
client.connect();
const db = client.db('test');
const collection = db.collection('quantiply');
collection.createIndex( { date: 1 }, { unique: true } )
module.exports.collection = collection;

module.exports.findDate = function(){
  return collection.findOne({"date":new Date().toISOString().slice(0, 10)})
}