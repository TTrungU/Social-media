const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/postRoute')
require('dotenv').config()

const app = express();

app.use(cors())
app.use(cookieParser())

app.use(bodyParser.json({ limit: '30mb', extends: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use("/api/user", authRoute)
app.use("/api/posts", postRoute)
// app.listen(8000, () => {
//     console.log("server is running ");
// })

const PORT = 8000
const URI = process.env.MONGODB_URL
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

