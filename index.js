const http = require('http');
const fs = require('fs');
const path = require('path')

const hostname = 'localhost';
const port = 3000;

//now setting up the server
const server = http.createServer((req, res) => {
    //request headers shows where the request is coming from
    console.log('Requet for : ', req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if(req.url == '/') {
            fileUrl = '/index.html'
        } else {
            fileUrl = req.url;
        }

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        if(fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found!</h1></body></html>')
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
            
                    fs.createReadStream(filePath).pipe(res);    //piping the filepath stream, into the response
                }
            })
        } else {
            res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' is not a html file!</h1></body></html>')
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported!</h1></body></html>')
    }   
})

//to start the server:
server.listen(port, hostname, () =>{
    console.log(`Server running at http://`+ hostname + `:` + port);
})