const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const app = express();
const exphbs = require("express-handlebars");
const members = require("./Members");
/* app.get("/", (req, res) => {
  //   res.send("<h1>Hello, World!!</h1>"); //send a html file instead as below
  res.sendFile(path.join(__dirname, "public", "index.html"));
}); */

// this way we have to separately put routes for each pages so not recommended

//INIT MIDDLEWARE
// app.use(logger);

//Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Homepage Route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members Mangement System",
    members
  })
);

//WE SET PUBLIC AS STATIC FOLDER AND RATHER DO AS BELOW
app.use(express.static(path.join(__dirname, "public"))); //we use one onmy among HOMEPAGE ROUTE AND THIS SO FIRST ONE SHOWS UP

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
