const mongoose = require("mongoose");
const keys = require("../config/keys");
mongoose.Promise = global.Promise;
const db = keys.key;
before(done => {
  mongoose.connect(db, { useNewUrlParser: true });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
