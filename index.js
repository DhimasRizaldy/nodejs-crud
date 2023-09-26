const { create, index, show, update, destroy } = require("./helpers/crud");

// test create post
create("test title", "test data");

// test show all post
console.log("All Posts:");
console.log(index());
// test show detail post by id
// test update post by id
// test delete post by id
