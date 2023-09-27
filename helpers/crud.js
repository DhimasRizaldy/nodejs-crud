const fs = require('fs');
const posts = require('../database/posts');
const ShowModel = require('../models/show');
const PostModel = require('../models/post');


function create(title, body) {
    let newPost = new ShowModel(posts.id++, title, body);
    posts.data.push(newPost);

    fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
}

function index() {
    const data = fs.readFileSync('./database/posts.json', 'utf8');
    return JSON.parse(data);
}

function show(id) {
    const data = index();
    return data.find(item => item.id === id);
}

function update(id, title, body) {
    const data = index();
    const postIndex = data.findIndex(item => item.id === id);

    if (postIndex !== -1) {
        data[postIndex].title = title;
        data[postIndex].body = body;
        fs.writeFileSync('./database/posts.json', JSON.stringify(data, null, 4));
        return true; // Berhasil mengupdate
    } else {
        return false; // ID tidak ditemukan
    }
}

function destroy(id) {
    const data = index();
    const postIndex = data.findIndex(item => item.id === id);

    if (postIndex !== -1) {
        data.splice(postIndex, 1);
        fs.writeFileSync('./database/posts.json', JSON.stringify(data, null, 4));
        return true; // Berhasil menghapus
    } else {
        return false; // ID tidak ditemukan
    }
}

module.exports = { create, index, show, update, destroy };
