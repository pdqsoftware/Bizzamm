const url = require('url')
let data = require("./data");
const rules = require("./config");
const { config } = require('process');


const getRandomOTP = () => {
    // Generate a random 6 char OTP
    return String(Math.ceil(Math.random() * 1000000) - 1).padStart(6, '0')
}





const ageOtp = (otp) => {
    // Return the age of the OTP
    const timeNow = new Date()
    const timeThen = new Date(otp)
    console.log("timeThen", timeThen)
    // Calculate minutes difference
    const timeDiff = (timeNow - timeThen) / 1000 / 60
    // Seconds rounded to an integer
    const timeDiffSeconds = Math.round(timeDiff * 100)
    // console.log("Seconds:", timeDiffSeconds)
    return timeDiffSeconds
}

module.exports = {
    
    getOTP(fullUrl) {
        // console.log('getOTP ', fullUrl)
        const parseUrl = url.parse(fullUrl, true)
        const emailaddr = parseUrl.query.emailaddr
        // console.log("email address:", emailaddr)
        // let user = this.getUser(emailaddr)
        // const userCount = user.length
        // if (userCount === 0) {
        //     // Add a new user to data
        //     newUser = createNewUser(emailaddr)
        //     data.push(newUser)
        //     // user = newUser
        //     // console.log('user:', newUser)
        //     // console.log('user:', newUser.OTP[0])
        //     console.log('New user pin and date:', newUser.OTP[0].pin)
        //     return newUser.OTP[0].pin
        // }
        // console.log('Existing user:', user[0])
        let pin = user[0].OTP[0].pin
        let dateTime = user[0].OTP[0].dateTime
        let sent = user[0].OTP[0].sent
        const minDiff = ageOtp(user[0].OTP[0].dateTime)
        console.log('Existing user pin and date:', pin, " - ", Date(dateTime).substring(0, 25), " - ", minDiff, " - ", sent )
        // console.log('rule:', rules.expireSeconds)
        // console.log(getRandomOTP())
        user[0].OTP[0].sent = sent + 1
        data = [...data, user]
        return user[0].OTP[0].pin
    },

    getUser(emailaddr) {
        const user = data.filter((user) => user.email === emailaddr)
        // console.log('user:', user)
        return user
    },

    createNewUser(users, email) {
        //
        // Create a new user incrementing the id
        // 1.  users (object) - data for all site users
        // 2.  email (string) - email address for new user
        //
        const highId = Math.max(...users.map((user) => user.id))
        // console.log(highId)
        const newUserDate = new Date().getTime()
        const newUser = {
            id: highId + 1,
            OTP: [{pin: getRandomOTP(), dateTime: newUserDate, sent: 1}],
            email: email,
            validated: false
        }
        return newUser
    },

    processUser(users, user, email) {
        //
        // Handles an existing user - checking all of the rules for his/her request
        // 1.  users (object) - data for all site users
        // 2.  user (object) - user to process
        // 3.  email (string) - email address for new user
        //
        console.log("pin = ", user[0].OTP[0].dateTime)
        const pinAge = ageOtp(user[0].OTP[0].dateTime)
        console.log(pinAge)

        // Older than 30 seconds?
        console.log('expires:', rules.expireSeconds)
        if (pinAge > config.expireSeconds) {
            return "OTP has expired!"
        }
        return "OK"
    }

}