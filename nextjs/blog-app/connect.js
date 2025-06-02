const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./blog.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (error) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Connection to the database is successful");
  }
);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT,
            img TEXT
        )`,
    (error) => {
      if (error) {
        return console.log(error.message);
      }
      console.log("Database created successful");

      db.run(`DELETE FROM BLOGS`, (error) => {
        if (error) {
          return console.log(error.message);
        }
        console.log("Database clear!");

        const row1 = [
          "Blog Title 1",
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium, incidunt libero harum sint quidem beatae pariatur quasi veniam ducimus quae odit exercitationem ad quisquam assumenda dolorem nisi sapiente eum!",
          "1.jpg",
        ];

        const row2 = [
          "Blog Title 2",
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium, incidunt libero harum sint quidem beatae pariatur quasi veniam ducimus quae odit exercitationem ad quisquam assumenda dolorem nisi sapiente eum!",
          "2.jpg",
        ];

        const row3 = [
          "Blog Title 3",
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium, incidunt libero harum sint quidem beatae pariatur quasi veniam ducimus quae odit exercitationem ad quisquam assumenda dolorem nisi sapiente eum!",
          "3.jpg",
        ];

        const row4 = [
          "Blog Title 4",
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo praesentium, incidunt libero harum sint quidem beatae pariatur quasi veniam ducimus quae odit exercitationem ad quisquam assumenda dolorem nisi sapiente eum!",
          "4.jpg",
        ];

        const sql = `INSERT INTO blogs(name,description,img) VALUES(?,?,?)`;

        db.run(sql, row1, function (error) {
          if (error) {
            return console.log(error.message);
          }
          const id = this.lastID;
          console.log("last inserted id: " + id);
        });

        db.run(sql, row2, function (error) {
          if (error) {
            return console.log(error.message);
          }
          const id = this.lastID;
          console.log("last inserted id: " + id);
        });

        db.run(sql, row3, function (error) {
          if (error) {
            return console.log(error.message);
          }
          const id = this.lastID;
          console.log("last inserted id: " + id);
        });

        db.run(sql, row4, function (error) {
          if (error) {
            return console.log(error.message);
          }
          const id = this.lastID;
          console.log("last inserted id: " + id);
        });
      });
    }
  );
});
