const users = [
    {
        id: 1,
        OTP: [
            {pin: '654321', dateTime: 1700544908293, sent: 2},
            {pin: '909090', dateTime: 1700544908293, sent: 1}, 
            {pin: '050506', dateTime: 1700544908293, sent: 3}],
        email: "pdqsoftware@gmail.com",
        validated: false,
    },
    {
        id: 2,
        OTP: [{pin: '005566', dateTime: 1700573465920, sent: 0}],
        email: "tester@onetwothree.net",
        validated: false,
    },
    {
        id: 3,
        OTP: [{pin: '963200', dateTime: 1700544908293, sent: 1}],
        email: "me@me.ct",
        validated: false,
    },
    {
        id: 4,
        OTP: [{pin: '', dateTime: 0, sent: 0}],
        email: "simon@google.com",
        validated: false,
    },
];
module.exports = users;