import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()





// to see all the data
async function getNotes() {
    const [result] = await pool.query("SELECT * FROM notes");
    return result;
}

const notes_data = await getNotes();
// console.log(notes_data);






// get specific data but the wrong way of practice because we are providing the value directly
// async function getNode(id) {
//     const [result] = await pool.query(`
//     SELECT * 
//     FROM notes
//     WHERE id = ${id}`
//     );
//     return result;
// }

// const node_data = await getNode(1);
// console.log(node_data);







// get specific data but the currect way of practice because we are providing the value and query seprately
async function getNode(id) {
    const [result] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `, [id]);
    return result[0]
}

// const node_data = await getNode(7);
// console.log(node_data);








// here we will use insert statement
async function createNote(title, content) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, content]);

    const id = result.insertId
    return getNode(id)
    
}

const result = await createNote('my second note 15','a note about something 15');
console.log(result);
