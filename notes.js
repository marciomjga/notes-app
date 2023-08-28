import fs from "fs";
import validator from "validator";
import chalk from "chalk";

const chalkInfo = chalk.blue;
const chalkErr = chalk.red;
const chalkTitle = chalk.green.bold.inverse.italic;

export const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatedNote = notes.find((note) => note.title === title);

  if (!duplicatedNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalkInfo("Note added!"));
  } else {
    console.log(chalkErr("Note duplicated!"));
  }
};

export const removeNote = (title) => {
  const notes = loadNotes();
  const notesFiltered = notes.filter((note) => note.title !== title);
  if (notesFiltered.length === notes.length) {
    console.log(chalkErr("Note with title '" + title + "' not found"));
  } else {
    saveNotes(notesFiltered);
    console.log(chalkInfo("Note with title '" + title + "' was removed"));
  }
};

export const listNotes = () => {
  const allNotes = loadNotes();
  console.log(chalkTitle("These are your notes"));
  allNotes.forEach((note) => console.log(chalkInfo(noteToString(note))));
};

export const readNote = (title) => {
  const allNotes = loadNotes();
  const noteFound = allNotes.find((note) => note.title === title);
  if (noteFound) {
    console.log(
      chalkTitle(
        "This is the note found for title '" + noteFound.title + "' :",
      ),
    );
    console.log(chalkInfo(noteFound.body));
  } else {
    console.log(chalkErr("Note requested was not found!"));
  }
};

const noteToString = (note) => {
  return "Title: " + note.title + " Body: " + note.body;
};

export const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
export const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSon = dataBuffer.toString();
    return JSON.parse(dataJSon);
  } catch (e) {
    return [];
  }
};
