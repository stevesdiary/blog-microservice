const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
const posts = {}; 

app.get('/posts', (req, res)=>{
   res.send(posts);
});

app.post('/posts', (req, res)=>{
   const id = randomBytes(4).toString('hex');
   const { tittle } = req.body;

   posts [id] = {
      id, tittle
   }
   res.status(201).send(posts [id]);
});
axios.post('http://localhost:4005/events'),{
   type: 'PostCreated',
   data: {
      // id,tittle
   }
}

app.listen(4000, ()=>{
   console.log('App listening on port 4000')
})