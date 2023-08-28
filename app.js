import validator from "validator";
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { addNote, listNotes, readNote, removeNote } from "./notes.js";

// const command = process.argv[2];
const chalkInfo = chalk.blue;
const chalkYargs = chalk.green;
const chalkErr = chalk.red;

yargs(hideBin(process.argv))
  .command(
    "add",
    "This adds a new note",
    {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note body",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => addNote(argv.title, argv.body),
  )
  .command(
    "remove",
    "This removes a new note",
    {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => removeNote(argv.title),
  )
  .command("list", "This lists all notes", () => listNotes())
  .command(
    "read",
    "Read a note",
    {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => readNote(argv.title),
  )
  .parse();
