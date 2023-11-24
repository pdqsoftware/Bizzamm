# Paul Pritchard

This file will contains notes which I'll add as I go along...
I have tried to keep it very simple and not to use any frameworks or modules - just vanilla Node.

1.  Use the Postgres 14 DB to store the data in data.js


To obtain a OTP:
# https://paul-8080.entrostat.dev/api/requestotp

To validate a OTP:
# https://paul-8080.entrostat.dev/api/validateOtp


Required NPM modules:
  pg-promise


ToDo:
1.  Quite a bit of duplicated code in server.js
2.  Complete the function descriptive comments