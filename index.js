const { create, index, show, update, destroy } = require('./helpers/crud');

// test create post
// create('Buku Pemrograman 2', 'Best Practice Pemrograman javascript 2');

// Get Data BY ID
// show(2);

// test show all post
// test show detail post by id
// test update post by id
update({ id: 1, title: 'Post Instagram Pemandangan', content: 'Konten telah diperbarui.' });
// test delete post by id
// destroy(1);
