const http = require('http');

const hostname = 'localhost';
const port = 3000;

//now setting up the server
const server = http.createServer((req, res) => {
    //request headers shows where the request is coming from
     console.log('request headers : ', req.headers);

    //status will enable us to status the code of our response
     res.statusCode = 200;              //200 means everything is ok
     res.setHeader('Content-Type', 'text/html');
     //the information in end($$) will be sent back
     res.end('<html><body><h1>Hello , world!</h1></body></html>')
})

//to start the server:
server.listen(port, hostname, () =>{
    console.log(`Server running at http://`+ hostname + `:` + port);
})