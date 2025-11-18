import express from "express"; // ES module import
const app = express(); // create new express instance
app.get("/hello", (req, res) => {
  res.send("Hello World!");
}); // create a route that responds 'hello'
app.listen(4000); // listen to http://localhost:4000
console.log("Server running on http://localhost:4000");
