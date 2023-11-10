const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const itemRouter = require("./routes/items");
const imageRouter = require("./routes/images");
const userRouter = require("./routes/user");

/* Defaut cors configuration
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
*/
app.use(cors(
    {
        origin: "http://localhost:4200",
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use('/user', userRouter);

app.use("/items", itemRouter);

app.use("/images", imageRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});