const express = require("express");

const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const postRouter = require("./routers/post");
const userRouter = require("./routers/user");
const commentRouter = require("./routers/comment");

app.use('/comments', commentRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);




app.get('*', (req, res) => {
    res.json({ ok: true });
});

const port = 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`)
})