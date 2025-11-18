import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";

export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });

  // register path parameter routes
  PathParameters(app);

  // register query parameter routes
  QueryParameters(app);

  // register object routes
  WorkingWithObjects(app);

  // register array routes
  WorkingWithArrays(app);
}

// accepts app reference and registers Lab 5 routes
