const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

// 1. cookies 

   // app.get('/', (req, res) => {
   //     res.cookie("name", "hasrh");
   //     res.send("done");
   // })
   // app.get("/read", (req, res) => {
   //     console.log(req.cookies);
   //     res.send("read page");
   // })


// 2. encryption and decryption
   // app.get('/', (req, res) => {
//      bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash("password", salt, (err, hash) => {
//             console.log(hash);
//         });
//     })

// });

// 3. password hashing
    // app.get('/', (req, res) => {
    //     const hashedPassword = "$2b$10$zkU/97SAg4Vx1WksWtKH.u.NTYp4mWOm9HqobIsXEjq5geksGLIeW";
    //     bcrypt.compare("password", hashedPassword, (err, result) => {
    //         console.log(result); // true if password matches
    //     });
    // });



// 4. JWT
app.get('/', (req, res) => {
    const token = jwt.sign({ email: "suryasubharyan@gmail.com"}, "secretkey");
    // console.log(token);
    res.cookie("token", token);
    res.send("JWT token created and cookie set");
})

app.get('/protected', (req, res) => {
   let data = jwt.verify(req.cookies.token, "secretkey");
   console.log(data);
   res.send("Protected route accessed");
});
app.listen(3000);