const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      server_error(res);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/data", (req, res) => {
  try {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        server_error(res);
      } else {
        const newdata = req.body;
      res.status(200).send(data.products);

        // data.products.push(newdata);
        res.json("sucess")
        // res.status(201).send("data stored successfully");
      }
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
