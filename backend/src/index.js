const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const { db } = require("../.env");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
	req.io = io;
	next();
});

mongoose.connect(db.URL, { useNewUrlParser: true });

app.use(cors());
app.use(require("./routes"));
app.use(
	"/files",
	express.static(path.resolve(__dirname, "..", "uploads", "resized")),
);
server.listen(3333);
