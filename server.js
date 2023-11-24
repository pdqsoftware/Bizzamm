const http = require('http')
const url = require('url')
const fs = require('fs').promises
const PORT = process.env.PORT || 8080
const { getOTP, createNewUser, getUser, processUser, processUserResend } = require('./functions')
let data = require("./data");


const server = http.createServer(async (req, res) => {

    console.log(`req.url = ${req.url} and method = ${req.method}`)

    // Set the request route
    if (req.url === "/api/data" && req.method === "GET") {
        //
        // Get all the current user records
        //
        // Set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // Send the data to the browser
        res.write(JSON.stringify(data));
        // End the response
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

        // Validate the request
        const parseUrl = url.parse(req.url, true)
        const emailaddr = parseUrl.query.emailaddr
        const user = getUser(emailaddr)
        console.log('/api/requestotp? - user = ', user)
        let webResponse
        if (user.length === 0) {
            // New user
            const newUser = createNewUser(data, emailaddr)
            data.push(newUser)
            console.log('newUser:', newUser)
            webResponse = `Your OTP is: ${newUser.OTP[0].pin}`
        } else {
            // Existing user
            webResponse = processUser(data, user, emailaddr)
        }

        fs.readFile(__dirname + '/requestotp.html')
        .then(contents => {
            const mytext=contents.toString()
            const result = mytext.replace("OPT-IN-HERE", webResponse);
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

    } else if (req.url.match(/\/api\/resendotp?/) && req.method === "GET") {
        // Resend a OTP with email sent as GET request
        console.log('/api/resendotp? - GET')

        // Validate the request
        const parseUrl = url.parse(req.url, true)
        const emailaddr = parseUrl.query.emailaddr
        const user = getUser(emailaddr)
        console.log('/api/resendotp? - user = ', user)

        let webResponse = ""
        if (user.length === 0) {
            webResponse = "Submitted email does not exist!"
        } else {
            // Existing user
            webResponse = processUserResend(data, user, emailaddr)
        }
        // webResponse = "Resend successful"

        // if (user.length === 0) {
        //     // New user
        //     const newUser = createNewUser(data, emailaddr)
        //     data.push(newUser)
        //     console.log('newUser:', newUser)
        //     webResponse = `Your OTP is: ${newUser.OTP[0].pin}`
        // } else {
        //     // Existing user
        //     webResponse = processUser(data, user, emailaddr)
        // }

        fs.readFile(__dirname + '/requestotp.html')
        .then(contents => {
            const mytext=contents.toString()
            const result = mytext.replace("OPT-IN-HERE", webResponse);
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
        //
        // If no route present
        //
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})