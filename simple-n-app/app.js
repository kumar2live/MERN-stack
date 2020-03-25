const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/users', (req, res, next) => {
  res.send(`<h3> User: ${req.body.username}</h3>`);
});

app.get('/', (req, res, next) => {
  res.send(
    `
    <form action='/users' method='POST'>
      <input type='text' name='username'>
      <button type='submit'>Create User</button>
    <form>
    `
  );
  // next();
});

// app.use((req, res, next) => {
//   let body = '';

//   req.on('end', () => {
//     res.setHeader('Content-Type', 'text/html');
//     const uname = body.split('=')[1];
//     if (uname) {
//       req.body = {name: uname};
//     }
//     next();
//   });

//   req.on('data', (chunk) => {
//     body += chunk;
//   });
// });

// app.get('/', (req, res, next) => {
//   if (req.body) {
//     return res.send(
//       `<h1>${req.body.name}</h1>`
//     );
//   }

//   res.send(
//     `
//     <form method='POST'>
//       <input type='text' name='username'>
//       <button type='submit'>Create User</button>
//     <form>
//     `
//   );
//   next();
// });

app.listen(1991);

// const fsRef = require('fs');
// const http = require('http');


// const server = http.createServer((req, res) => {
//   console.log('here -- ', req.method);
//   console.log('here -- ', req.url);

//   if (req.method === 'POST') {
//     let body;

//     req.on('end', () => {
//       res.setHeader('Content-Type', 'text/html')
//       res.end(`<h2>${body.split('=')[1]}</h2>`);
//     });

//     req.on('data', (chunk) => {
//       body += chunk;
//     });
//   } else {
//     res.setHeader('Content-Type', 'text/html')
//     res.end(
//       `
//         <form method='POST'>
//           <input type='text' name='username'>
//           <button type='submit'>Create User</button>
//         <form>
//       `
//     );
//   }
// });

// server.listen(1991);

// const myName = 'Muthu Kumar';

// fsRef.writeFile('user-data.txt', 'Name: ' + myName, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('it is done');
// })