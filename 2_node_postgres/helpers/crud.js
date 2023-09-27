const fs = require("fs");
const posts = require("../database/posts");
const PostModel = require("../models/post");
const pool = require("../database/postgres");

function create(title, body) {
  return new Promise(async (resolve, reject) => {
    try {
      // "SELECT * FROM posts where id = $1", [1]
      // "UPDATE posts SET title = $1, body = $2", ["title", "body"]
      let result = await pool.query(
        "INSERT INTO posts (title, body) values ($1, $2) RETURNING *;",
        [title, body]
      );
      resolve(result.rows[0]);
    } catch (err) {
      return reject(err);
    }
  });
}

async function index() {
  try {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
  } catch (err) {
    throw err;
  }
}

// function show(id) {
//   return new Promise((resolve, reject) => {
//     let post = posts.data.filter((p) => {
//       return p.id == id;
//     });

//     if (!post.length) return reject(`post with id ${id} is doesn't exist!`);

//     resolve(post[0]);
//   });
// }

async function show(id) {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      throw new Error(`post with id ${id} does not exist.`);
    }

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

function update(id, title, body) {
  return new Promise((resolve, reject) => {
    let postIndex = posts.data.findIndex((post) => post.id === id);

    if (postIndex < 0) return reject(`post with id ${id} is doesn't exist!`);
    if (title) posts.data[postIndex].title = title;
    if (body) posts.data[postIndex].body = body;

    fs.writeFileSync("./database/posts.json", JSON.stringify(posts, null, 4));
    resolve(posts.data[postIndex]);
  });
}

async function destroy(id) {
  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *;",
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error(`post with id ${id} does not exist.`);
    }

    return `post with id ${id} is deleted!`;
  } catch (err) {
    throw err;
  }
}

module.exports = { create, index, show, update, destroy };
