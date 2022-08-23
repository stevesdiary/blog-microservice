const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const posts = {};

app.get('/posts/:id/comments', (req, res)=>{
   res.send(commentsByPostId[req.params.id] || []);
});

const commentsByPostId = {};

app.post('/posts/:id/comments', (req, res)=>{
   const commentId = randomBytes(4).toString('hex');
   const content = req.body;

   const comments= commentsByPostId[req.params.id] || []
   comments.push({ id: commentId, content });
   commentsByPostId[req.params.id] = comments;
   await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
         id: commentId,
         content: req.params.id
      }
   });

   res.status(201).send(comments);
});

app.listen(4001, ()=>{
   console.log('App listening on port 4001')
})