const mongoose = require("mongoose");

const db_url = process.env.DB_URL;

const dbConfig = () => {
  mongoose
    .connect(db_url)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log("DB Error:" + error);
    });
};

module.exports = dbConfig
