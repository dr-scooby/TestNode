const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figs = require('figlet');

const server = http.createServer((req, res) => {


    // function
    const readWrite = (file, contentType) => {
        fs.readFile(file, function(err, data) {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        });
    }


    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(params);
    console.log(page);
    console.log(req);

    if(page == '/index'){
        readWrite('index.html', 'text/html');
   
    } 
    else if(page == '/api'){
        if('student' in params){
            let apersonName = '';
            let apersonOccupation = 'unknown' ;
            let apersonStatus = 'unknown';

            if(params['student'] == 'nurali'){
                res.writeHead(200, {'Content-Type' : 'application/json'});
                const objToJson = {
                    name: 'Nurali',
                    status: 'BOSS Bro',
                    currentOccuption: 'Software Engineer'
                }
                res.end(JSON.stringify(objToJson));
            }//student == nurali
            else if(params['student'] == 'flip'){
                let flipresult = Math.random() <= .5 ? "heads" : "tails";
                res.writeHead(200, {'Content-Type' : 'application/json'});
                const objToJson = {
                    name: flipresult                    
                }
                res.end(JSON.stringify(objToJson));
            }
            else if(params['student'] != 'nurali'){
                res.writeHead(200, {'Content-Type' : 'application/json'});
               apersonName = params['student'];
                const objToJson = {
                    name: apersonName,
                    status: apersonStatus,
                    currentOccuption: apersonOccupation
                }
                res.end(JSON.stringify(objToJson));
            }
        }
    }
    else if(page == '/other'){
        readWrite('other.html', 'text/html');
    }
    else if(page == '/css/style.css'){
        fs.readFile('css/style.css', function(err, data){
            res.write(data);
            res.end();
        });

    }
    else if(page == '/js/main.js'){
        fs.readFile('js/main.js', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });

    }
    else{
        figs('404!!!  Page not found', function(err, data) {
            if(err){
                console.log("something went wrong....");
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
        });
    }
})
server.listen(8001);