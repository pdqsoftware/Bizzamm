const config = 
    {
        // OTP expires after X seconds
        expireSeconds: 30,
        // Maximum requests per hour
        maxPerHour: 3,
        // Boundary minutes for same resend of OTP
        resendMinutes: 5,
        // Same OTP can only be sent X times - see resendMinutes
        maxOTPresends: 3
    }

module.exports = config
