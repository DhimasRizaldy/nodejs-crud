const fs = require('fs');
const posts = require('../database/posts');
const PostModel = require('../models/post');
const pool = require('../database/postgres');

function create(title, body) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query("INSERT INTO posts (title, body) values ($1, $2) RETURNING *;", [title, body]);
            resolve(result.rows[0]);
        } catch (err) {
            return reject(err);
        }
    });
}

function index() {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query("SELECT * FROM posts;");
            resolve(result.rows);
        } catch (err) {
            return reject(err);
        }
    });
}

function show(id) {
    return new Promise((resolve, reject) => {
        let post = posts.data.filter(p => {
            return p.id == id;
        });

        if (!post.length) return reject(`post with id ${id} is doesn't exist!`);

        resolve(post[0]);
    });
}

function update(id, title, body) {
    return new Promise((resolve, reject) => {
        let postIndex = posts.data.findIndex(post => post.id === id);

        if (postIndex < 0) return reject(`post with id ${id} is doesn't exist!`);
        if (title) posts.data[postIndex].title = title;
        if (body) posts.data[postIndex].body = body;

        fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
        resolve(posts.data[postIndex]);
    });
}


function destroy(id) {
    return new Promise((resolve, reject) => {
        let postIndex = posts.data.findIndex(post => post.id === id);

        if (postIndex < 0) return reject(`post with id ${id} is doesn't exist!`);

        posts.data.splice(postIndex, 1);

        fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
        resolve(`post with id ${id} is deleted!`);
    });
}

module.exports = { create, index, show, update, destroy };