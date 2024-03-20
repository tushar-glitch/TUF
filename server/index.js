const express = require('express')
const cors = require('cors')
const pool = require('./db/conn')
const subRouter = require("./routes/submissionrouter");

const app = express()

app.use(cors({
    origin: true
}))
app.use(express.json());
const port = process.env.PORT || 5000;
// app.get('/', (req, res) => {
//     pool.query(`select * from submissions`, (err, result, fields) => {
//         if (err) console.log(err);
//         else console.log(result);
//     })
//     res.send("Its up and working!!")
// })
app.use('/api/submissions', subRouter)
app.listen(port)