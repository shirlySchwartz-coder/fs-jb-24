/* import {express} from "express";
import {cors} from "cors";
import {multer} from "multer"; */
const express = require('express');
const cors = require('cors');
const multer = require('multer');

// Create express app
const app = express();

app.use(express.json());
app.use(cors());

app.get("/helloText", (req, res) => {
  res.send({ myResponse: "Hello World!" });
});

const upload = multer({ dest: "tmp/uploads/" });
app.post("/uploadFile", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send({ myResponse: "File uploaded successfully" });
});


app.listen(8000, () => {
  console.log(`Server is running on port ${8000}`);
});