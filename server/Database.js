const mongoose = require("mongoose");
const Note = require("./schemas(Collection)/note");
class Database {
  constructor() {
    this.Url = process.env.MONGODB_URL || "mongodb+srv://mahdi_kotti:admin123@cluster0.xtyyqth.mongodb.net/";
  }

  connect() {
    mongoose
      .connect(this.Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Database connected successfuly");
      })
      .catch((err) => {
        console.log("Error received when adding note:", err);
      });
  }
  // Post Function
  addNote(note) {
    return new Promise((resolve, reject) => {
      // ena hedhouma zethom wa7di ala5atr hedhom moch bech ida5lhom client
      note["createdDate"] = new Date();
      note["updatedDate"] = new Date();
      let newNote = new Note(note);
      newNote
        .save()
        .then((doc) => {
          resolve(doc);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // Get Function
  getNote() {
    return new Promise((resolve, reject) => {
      Note.find({})
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // GetById Function
  getNoteById(id) {
    return new Promise((resolve, reject) => {
      Note.findById(id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // Update Function
  updateNote(note) {
    return new Promise((resolve, reject) => {
      note["updatedDate"] = new Date();
      Note.findByIdAndUpdate(note["_id"], note)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // Delete Function
  deleteNote(id) {
    return new Promise((resolve, reject) => {
      Note.findByIdAndDelete(id)
        .then((data) => {
          console.log("deleted document:", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  // getNoteByTitle Function
  getNoteByTitle(noteTitle) {
    return new Promise((resolve, reject) => {
      // ignore key sensitivity (lowercase or uppercase)
      const query = { title: { $regex: new RegExp(noteTitle, "i") } };
      Note.find(query)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Database;

// ==> hedha file fiwsto 3malt cnx mta3 database wil functions eli nesta5dimhom fi wst APIs
