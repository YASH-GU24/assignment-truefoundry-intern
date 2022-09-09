const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./files.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("success")
    }
})

// create table
// sql= `CREATE TABLE files(id INTEGER PRIMARY KEY, file_name, file_content)`
// db.run(sql)



// drop table
// db.run(`DROP TABLE files`)



//You can insert new files from here
sql = `INSERT INTO files(file_name,file_content) VALUES (?,?)`;
db.run(sql, ["File name here", "File content here"], (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("successfully added file")
    }
})



//Query to check the files in db
// sql = `SELECT * FROM files`
// db.all(sql, [], (err, res) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(res)
//     }
// })
