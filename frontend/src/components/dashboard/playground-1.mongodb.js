// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("mkad");

// Create a new document in the collection.
db.getCollection("updates").insertOne({
  _id: {
    $oid: "66307fd10155030c5b5036b9",
  },
  sender: {
    _id: "6629776b01c1a1b51e3542cd",
    type: "member",
    name: "Dreamer",
  },
  recipient: {
    _id: {
      $oid: "662c8211a67ce64e7e78c8b6",
    },
  },
  type: "message",
  content: "Message Received",
  read: false,
});
