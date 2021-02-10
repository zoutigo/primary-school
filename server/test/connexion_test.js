const mongoose = require("mongoose");
const { listRubrics } = require("../controllers/rubricController");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

before((done) => {
  mongoose.connect(process.env.DB_TEST_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection
    .once("open", () => {
      console.log("connexion to database is running");
      done();
    })
    .on("error", (error) =>
      console.warn("erreur de connexion à la base de données", error)
    );
});

beforeEach("Supprime la collection crée", (done) => {
  // const { users } = mongoose.connection.collections;
  // users.drop()
  // rubrics.drop()

  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      names.forEach(function (e, i, a) {
        mongoose.connection.db.dropCollection(e.name);
        console.log("--->>", e.name);
      });
    }
  });
  done();
});

// db.getCollectionNames().forEach(c=>db[c].drop())
