import express from "express";
import bodyParser from 'body-parser'
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; // Each post: { title, content }

app.get("/", (req, res) => {
  res.render("home", { posts });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postTitle", (req, res) => {
  const requestedTitle = req.params.postTitle.toLowerCase();

  const foundPost = posts.find(p => p.title.toLowerCase() === requestedTitle);
  if (foundPost) {
    res.render("post", { post: foundPost });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


