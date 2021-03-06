var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var messageS_COLLECTION = "messages";

var MESSAGES_COLLECTION = "messages";


var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;


mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// messageS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/messages"
 *    GET: finds all messages
 *    POST: creates a new message
 */

app.get("/api/messages", function(req, res) {
  db.collection(messageS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get messages.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/messages", function(req, res) {
  var newmessage= req.body;
  newmessage.createDate = new Date();

  db.collection(messageS_COLLECTION).insertOne(newmessage, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new message.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/messages/:id"
 *    GET: find messageby id
 *    PUT: update messageby id
 *    DELETE: deletes messageby id
 */

app.get("/api/messages/:id", function(req, res) {
  db.collection(messageS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get message");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/messages/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(messageS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update message");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/messages/:id", function(req, res) {
  db.collection(messageS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete message");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});