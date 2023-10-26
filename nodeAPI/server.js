const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users");
const itemRouter = require("./routes/items");
const imageRouter = require("./routes/images");
app.use(cors({origin: true}));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/users", usersRouter);

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
    console.log(`Example app listening at http://localhost:${port}`);
});