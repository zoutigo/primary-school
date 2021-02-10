const mongoose = require("mongoose");

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
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      names.forEach(function (e, i, a) {
        mongoose.connection.db.dropCollection(e.name);
        // console.warn("--->>", e.name);
      });
    }
  });
  done();
});
