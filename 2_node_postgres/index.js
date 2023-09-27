const { create, index, show, update, destroy } = require('./helpers/crud');


async function main() {
    try {
        // test create post
        // let newPost = await create('test title', 'test data');
        // console.log(newPost);

        // // test show all post
        let posts = await index();
        console.log(posts);

        // // test show detail post by id
        // let post = await show(3);
        // console.log(post);

        // // test update post by id
        // let updatedPost = await update(42, 'title new update','body new update to');
        // console.log(updatedPost);

        // // test delete post by id
        // let deletedPost = await destroy(41);
        // console.log(deletedPost);

    } catch (err) {
        console.log(err);
    }
}
main();