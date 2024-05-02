//************************Add Modal************************
function openAddModal() {
  var modal = document.getElementById("addNoteModal");
  var closeNote = document.getElementById("closeAdd");
  var cancelBtn = document.getElementById("cancelAddNoteBtn");
  clearModalAdd();
  //Open modal
  modal.style.display = "block";
  //Close modal
  closeNote.onclick = () => {
    modal.style.display = "none";
  };
  //Close modal with cancel button
  cancelBtn.onclick = () => {
    modal.style.display = "none";
  };
}
// function to clear  add modal
function clearModalAdd() {
  document.getElementById("addTitle").value = "";
  document.getElementById("addContent").value = "";
  document.getElementById("addError").innerHTML = "";
}
// *****function save note (POST)*****
function saveNewNote() {
  const addTitle = document.getElementById("addTitle").value;
  const addContent = document.getElementById("addContent").value;
  // hedhi data eli bech nab3athha lil function POST
  const noteData = { title: addTitle, content: addContent };
  addNote(noteData)
    .then((response) => {
      if (response.ok) {
        var modal = document.getElementById("addNoteModal");
        modal.style.display = "none";
        // add id to NotesTable
        response.json().then((json) => {
          var idNote = json["_id"];
          updateNotesTable(idNote);
        });
      } else {
        response.text().then((error) => {
          document.getElementById("addError").innerHTML = error;
        });
      }
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("addError").innerHTML = error;
    });
}
//************************Edit Modal************************
function openEditModal(noteId) {
  var editModal = document.getElementById("editNoteModal");
  var closeEdit = document.getElementById("closeEdit");
  var cancelBtn = document.getElementById("cancelEditNoteBtn");

   

  editModal.style.display = "block";

  //Close modal
  closeEdit.onclick = () => {
    editModal.style.display = "none";
  };
  //Close modal with cancel button
  cancelBtn.onclick = () => {
    editModal.style.display = "none";
  };

  loadNoteData(noteId);
}
// function to load data in edit modal (GET by ID)
function loadNoteData(noteId) {
  var modal = document.getElementById("editNoteModal");
  var noteIdAttribute = document.createAttribute("noteid");
  noteIdAttribute.value = noteId;
  modal.setAttributeNode(noteIdAttribute);
  GetNoteById(noteId).then((data) => {
    document.getElementById("editTitle").value = data["title"];
    document.getElementById("editContent").value = data["content"];
  });
}
// *****function Edit Note (PUT)*****
function saveEditNote() {
  var modal = document.getElementById("editNoteModal");
  const noteId = modal.getAttribute("noteid");
  const titleStr = document.getElementById("editTitle").value;
  const contentStr = document.getElementById("editContent").value;
  const noteData = { _id: noteId, title: titleStr, content: contentStr };
  updateNote(noteData)
    .then((response) => {
      if (response.ok) {
        var modal = document.getElementById("editNoteModal");
        modal.style.display = "none";
        updateNotesTable(noteId);
      } else {
        response.text().then((error) => {
          document.getElementById("editError").innerHTML = error;
        });
      }
    })
    .catch((error) => {
      document.getElementById("editError").innerHTML = error;
    });
}
