export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };

  const subtract = (req, res) => {
    const { a, b } = req.params;
    const diff = parseInt(a) - parseInt(b);
    res.send(diff.toString());
  };

  const multiply = (req, res) => {
    const { a, b } = req.params;
    const prod = parseInt(a) * parseInt(b);
    res.send(prod.toString());
  };

  const divide = (req, res) => {
    const { a, b } = req.params;
    const numA = parseInt(a);
    const numB = parseInt(b);
    if (numB === 0) {
      // avoid sending integer (could be treated as status); send message
      return res.send("Infinity");
    }
    const result = numA / numB;
    res.send(result.toString());
  };

  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
