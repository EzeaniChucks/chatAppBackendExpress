const express = require('express')
const cors = require('cors');
require('dotenv').config();

const app = express()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openAi = new OpenAIApi(configuration);

const port = process.env.PORT || 8081;

app.use(cors())
app.use(express.json())

app.post('/',async(req, res)=>{
    const {messages} = req.body;
    console.log(messages)
    try{

        const completion = await openAi.createChatCompletion({
            model:'gpt-3.5-turbo',
            max_tokens: 3000,
            messages
        });
        return res.status(200).json(completion.data.choices[0].message.content);
    }catch(err){
        return res.status(500).json(err.message)
    }
})

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`)
})