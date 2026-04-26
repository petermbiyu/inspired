import express from "express";

export const ejsRoutes = express.Router();

ejsRoutes.get("/", (req, res) => {
  res.render("index");
});
ejsRoutes.get("/services", (req, res) => {
  res.render("services");
});
ejsRoutes.get("/about", (req, res) => {
  res.render("about");
});
ejsRoutes.get("/contact", (req, res) => {
  res.render("contact");
});
ejsRoutes.get("/blogs/:topic", (req, res) => {
  res.render("blogs");
});

ejsRoutes.get("/login", (req, res) => {
  res.render("login");
});
ejsRoutes.get("/reset", (req, res) => {
  res.render("reset");
});
ejsRoutes.get("/passreset", (req, res) => {
  res.render("passreset");
});
ejsRoutes.get("/signup", (req, res) => {
  res.render("signup");
});

ejsRoutes.get("/resources", (req, res) => {
  res.render("resources");
});
ejsRoutes.get("/terms", (req, res) => {
  res.render("terms");
});
