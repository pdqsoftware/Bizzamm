const url = require('url')
let data = require("./data");
const rules = require("./config")


const getRandomOTP = () => {
    // Generate a random 6 char OTP
    return String(Math.ceil(Math.random() * 1000000) - 1).padStart(6, '0')
}

const getUser = (emailaddr) => {
    const user = data.filter((user) => user.email === emailaddr)
    // console.log('user:', user)
    return user
}

const createNewUser = (email) => {
    // Create a new user incrementing the id
    const highId = Math.max(...data.map((user) => user.id))
    // console.log(highId)
    const newUserDate = new Date().getTime()
    const newUser = {
        id: highId + 1,
        OTP: [{pin: getRandomOTP(), dateTime: newUserDate, sent: 1}],
        email: email,
        validated: false
    }
    return newUser
}

const ageOtp = (otp) => {
    // Return the age of the OTP
    const timeNow = new Date()
    const timeThen = new Date(otp)
    // Calculate minutes difference
    const timeDiff = (timeNow - timeThen) / 1000 / 60
    // Minutes rounded to 2 places
    const timeDiffMinutes = Math.round(timeDiff * 100) / 100
    // console.log("Minutes:", Math.round(timeDiff * 100) / 100)
    return timeDiffMinutes
}

module.exports = {
    
    getOTP(fullUrl) {
        // console.log('getOTP ', fullUrl)
        const parseUrl = url.parse(fullUrl, true)
        const emailaddr = parseUrl.query.emailaddr
        // console.log("email address:", emailaddr)
        let user = getUser(emailaddr)
        const userCount = user.length
        if (userCount === 0) {
            // Add a new user to data
            newUser = createNewUser(emailaddr)
            data.push(newUser)
            // user = newUser
            // console.log('user:', newUser)
            // console.log('user:', newUser.OTP[0])
            console.log('New user pin and date:', newUser.OTP[0].pin)
            return newUser.OTP[0].pin
        }
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
    }

}