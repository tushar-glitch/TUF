const express = require("express");
const {getmysubs, getallsubs, submitsub} = require('../controllers/submissionController')

const subRouter = express.Router();

subRouter.post("/post", submitsub);
subRouter.get("/get/:username", getmysubs);
subRouter.get("/get", getallsubs);

module.exports = subRouter;
