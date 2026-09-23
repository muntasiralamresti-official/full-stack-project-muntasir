const dns = require("node:dns");
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const authController = require("./controller/authController.js");
const dbConfig = require("./config/dbConfig.js");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const router = require("./route/index.js");

const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 8000;
dbConfig();
app.use(router);

app.get("/", (req, res) => {
  const data = [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
  ];
  res.send(data);
  console.log(data);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
