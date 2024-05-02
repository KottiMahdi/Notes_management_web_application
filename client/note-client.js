const baseUrl = "http://localhost:3000";

// Function : Call POST API
async function addNote(noteData) {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return response;
}
// Function : Call PUT API
async function updateNote(noteData) {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return response;
}
// Function : Call DELETE API
async function deleteNote(noteId) {
  const response = await fetch(`${baseUrl}/notes/${noteId}`, {
    method: "DELETE",
  });
  return response;
}
// Function : Call GETById API
async function GetNoteById(noteId) {
  const response = await fetch(`${baseUrl}/notes/${noteId}`);
  return response.json();
}
// Function : Call GET API
async function getNotes(titleNote) {
  let url = `${baseUrl}/notes`;
  if (titleNote) {
    url += `/?title=${titleNote}`;
  }
  const response = await fetch(url);
  return response.json();
}
