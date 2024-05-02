const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("./Database");

const db = new Database();
const app = express();

const port = process.env.PORT || 3000;
// Cross origin resource sharing. Important so that client will be able to make calls to APIs on a different domain.
app.use(cors());
app.use(bodyParser.json());
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false)
// or the qs library (when true).
app.use(bodyParser.urlencoded({ extended: false }));

// Create POST API to be able to create a new note
app.post("/notes", (req, res) => {
  const body = req.body;
  db.addNote(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create GET API to get all notes
app.get("/notes", (req, res) => {
  const { title } = req.query;
  if (title) {
    db.getNoteByTitle(title)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    db.getNote()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});
// Create GET by Id API to get a specific note
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.getNoteById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send("Note id doesn't exist " + id);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create Update API to update a specific note
app.put("/notes", (req, res) => {
  db.updateNote(req.body)
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(404).send("Note id doesn't exist " + id);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// Create Delete API to delete a speficic note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.deleteNote(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Started node server and listening to port ${port}`);
  db.connect();
});
