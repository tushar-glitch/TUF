const pool = require('../db/conn');
const axios = require('axios')

const submitsub = async (req, res) => {
    const { username, lang_id, input, code } = req.body
    try {
        var response = await getOutput(lang_id, input, code)
        console.log(response);
        pool.query(`insert into submissions (username, time_stamp, code, input, output, lang_id) values(?, now(), ?, ?, ?, ?)`, [username, code, input, response.stdout, lang_id], (err, result, fields) => {
            if (err) console.log(err);
            else {
                res.send(response)
            };
        })
    } catch (error) {
        console.log(error);
    }
}
const getOutput = async (lang_id, input, code) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'false',
            wait: 'true',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '5fa80d0a25msh41e3ad4ce1b40a3p12b665jsn09dcb93bc493',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: lang_id,
            source_code: code,
            stdin: input
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data
    } catch (error) {
        return error
    }
}
const getmysubs = async (req, res) => {
    const { username } = req.params
    try {
        pool.query(`SELECT * FROM submissions WHERE username = ?`, [username], (err, result, fields) => {
            if (err) console.log(err);
            else res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const getallsubs = async (req, res) => {
    try {
        pool.query(`SELECT * FROM submissions`, (err, result, fields) => {
            if (err) console.log(err);
            else res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    submitsub,
    getmysubs,
    getallsubs
};
