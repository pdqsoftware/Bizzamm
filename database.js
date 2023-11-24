// Move these to config.json
const host = '17.0.0.1'
const port = '5432'
const user = 'my_test'
const password = 'my_test'
const db = 'my_test'

const pgp = require('pg-promise')({})
const pgconfig = require("./config.json")

// Database connection details
const pgConnectionOptions = {
    host: pgconfig.pghost,
    port: pgconfig.pgport,
    user: pgconfig.pguser,
    password: pgconfig.pgpass,
    database: pgconfig.pgdb
}

// Database instance
const localDB = pgp(pgConnectionOptions)

// localDB.any('SELECT *, otp->0 AS array1, otp->1 AS array2 FROM public.user_table')
//     .then(function(data) {
//         // success;
//         console.log('Success')
//         console.log(data)
//     })
//     .catch(function(error) {
//         // error;
//         console.log('Failure')
//     });


const mid = 3
const mjson = '[{"pin": "963200", "dateTime": 1700544908293, "sent": 1}]'
const memail = "me@me.ct"
const mval = "false"
// localDB.any('INSERT INTO public.user_table(id, otp, email, validated) VALUES($1, $2, $3, $4)', [mid, mjson, memail, mval])
//     .then(function(data) {
//         // success;
//         console.log('Insert success')
//         // console.log(data)
//     })
//     .catch(function(error) {
//         // error;
//         console.log('Insert failure')
//     });

// // localDB.any('CREATE TABLE user_table (id smallint NOT NULL, otp json, email character varying COLLATE pg_catalog."default" NOT NULL, validated character varying COLLATE pg_catalog."default", CONSTRAINT user_table_pkey PRIMARY KEY (id)) WITH (OIDS = FALSE) TABLESPACE pg_default; ALTER TABLE user_table OWNER to postgres;')
// localDB.any('CREATE TABLE user_table (id smallint NOT NULL, otp json, email character varying COLLATE pg_catalog."default" NOT NULL, validated character varying COLLATE pg_catalog."default", CONSTRAINT user_table_pkey PRIMARY KEY (id)) WITH (OIDS = FALSE) TABLESPACE pg_default;')
// // localDB.any('DROP TABLE public.user_table')
//     .then(function(data) {
//         // success;
//         console.log('Created')
//         console.log(data)
//     })
//     .catch(function(error) {
//         // error;
//         console.log('Failure to create')
//     });

localDB.any("SELECT table_name FROM information_schema.tables WHERE table_schema='pg_catalog' AND table_name ILIKE '%user%';")
// localDB.any("SELECT * FROM information_schema.tables;")   // WHERE table_name = 'user_table;")
    .then(function(data) {
        // success;
        console.log('Success')
        console.log(data)
    })
    .catch(function(error) {
        // error;
        console.log('Failure to list')
    });