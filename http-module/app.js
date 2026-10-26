import http from 'node:http'
import messages from '../backend/messages.js';
import posts from './posts.js'

const app = http.createServer((request, response) => {
   
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end(JSON.stringify(messages));

});


const port = 3000;
app.listen(port, () => {
    console.log(`Serveren kører på http://localhost:${port}`);
});
