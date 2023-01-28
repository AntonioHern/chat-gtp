//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
const {Configuration, OpenAIApi} = require("openai");
require('dotenv').config()
const configuration = new Configuration({
    organization: "org-eKhMRA48hf6Roe77t2BNqRLm",
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);



// crate a simple express server api that will call the function above
const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
app.use(bodyParser.json());
//importante para que funcione el post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = 3000
const host = '0.0.0.0';

app.post('/',  async (req, res) => {
    //const message = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        max_tokens: 150,
        temperature: 0.5,
    })
   // console.log(response.data.choices[0].text)
    res.json({
        data: response.data.choices[0].text
    })
});
app.listen(port,host,() => {
    console.log(`Example app listening at ${host}:${port}`)
});

