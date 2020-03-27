require("dotenv").config();
const express = require("express");
const compression = require("compression");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;

const overviewRouter = require("./routes/overview");
const detailRouter = require("./routes/detail");

// gzip files
app.use(compression());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "static")));

// Routes;
app.use("/", overviewRouter);
app.use(detailRouter);

app.listen(process.env.PORT || 4000, () => console.log(`BT ${port}!`));
