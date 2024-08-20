// importing express
import  express  from "express";

import { getNotes, getNode, createNote } from "./database.js";

const app = express();
app.use(express.json());

// show alll the data
app.get("/notes", async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

//get specific data by id
app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await getNode(id)
    res.send(note)
})

//make the post request to insert the data
app.post("/notes", async (req, res) => {
    const {title, contents} = req.body;
    const note = await createNote(title, contents)
    res.status(201).send(note)
})


// error handling
// when we are use the next in the paraneter after req, res then that is the middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log("server is running on port 8080")
})




// there are also orms like prisma which you can use to communicate with the database withour writing the sql queryes