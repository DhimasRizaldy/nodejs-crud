const fs = require('fs');
const posts = require('../database/posts');
const PostModel = require('../models/post');
const ShowModel = require('../models/show');

function create(title, body) {
    let newPost = new PostModel(posts.id++, title, body);
    posts.data.push(newPost);

    fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
}

function index() {
    return fs.readJsonSync(ShowModel);
}
function show(id) {
    const data = index();
    return data.find(item => item.id === id);
}
function update(id, title, body) { }
function destroy(id) { }

module.exports = { create, index, show, update, destroy };