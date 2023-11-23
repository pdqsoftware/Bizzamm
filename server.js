const http = require('http')
const fs = require('fs').promises
const PORT = process.env.PORT || 8080
const { getOTP } = require('./functions')
let data = require("./data");


const server = http.createServer(async (req, res) => {

    console.log(`req.url = ${req.url} and method = ${req.method}`)

    // Set the request route
    if (req.url === "/api/data" && req.method === "GET") {
        //
        // Get all the user records
        //
        // Set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // Send the data to the browser
        res.write(JSON.stringify(data));
        //end the response
        res.end();

    } else if (req.url === "/api/requestotp" && req.method === "GET") {
        //
        // Initial call to load request OTP HTML page
        //
        console.log('/api/requestotp - GET')
        fs.readFile(__dirname + '/requestotp.html')
        .then(contents => {
            const mytext=contents.toString()
            const message = Buffer.from(mytext.replace("OPT-IN-HERE", ""))
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200)
            res.end(message)
        })
        .catch(err => {
            res.writeHead(500)
            res.end(err)
        })

    } else if (req.url.match(/\/api\/requestotp?/) && req.method === "GET") {
        // Request for a OTP with email sent as GET request
        console.log('/api/requestotp? - GET')
        const otp = getOTP(req.url)
        fs.readFile(__dirname + '/requestotp.html')
        .then(contents => {
            const mytext=contents.toString()
            const result = mytext.replace("OPT-IN-HERE", `Your OTP is: ${otp}`);
            const message = Buffer.from(result)
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200)
            res.write(message)
            res.end()
        })
        .catch(err => {
            res.writeHead(500)
            res.end(err)
        })

    } else if (req.url === "/api/validateotp" && req.method === "GET") {
        //
        // Initial call to load validate OTP HTML page
        //
        console.log('/api/validateotp - GET')
        fs.readFile(__dirname + '/validateotp.html')
        .then(contents => {
            const mytext=contents.toString()
            const message = Buffer.from(mytext.replace("VALID-IN-HERE", ""))
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200)
            res.end(message)
        })
        .catch(err => {
            res.writeHead(500)
            res.end(err)
        })

    } else if (req.url.match(/\/api\/validateotp?/) && req.method === "GET") {
        // Request for a OTP validation with email and OTP sent as a GET request
        console.log('/api/validateotp? - GET')
        fs.readFile(__dirname + '/validateotp.html')
        .then(contents => {
            const mytext=contents.toString()
            const validated = 'valid'
            const result = mytext.replace("VALID-IN-HERE", `Your OTP is: ${validated}`);
            const message = Buffer.from(result)
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200)
            res.write(message)
            res.end()
        })
        .catch(err => {
            res.writeHead(500)
            res.end(err)
        })

    } else {
        // If no route present
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})