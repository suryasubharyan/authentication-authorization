# authentication-authorization

This project demonstrates basic authentication and authorization concepts using Node.js, Express, cookies, bcrypt for password hashing, and JWT (JSON Web Tokens).

---

## What is Authentication and Authorization?

- **Authentication** is the process of verifying who a user is.  
  *Example: Logging into your email account with your username and password.*

- **Authorization** is the process of verifying what a user has access to.  
  *Example: After logging in, you can read your emails but not access the admin panel unless you have permission.*

---

## Real Life Example

Imagine you visit a library:

- **Authentication:**  
  When you enter, you show your library card to prove your identity. The librarian checks if the card is valid.

- **Authorization:**  
  Once inside, your card type determines what you can do. A regular member can borrow books, but only staff can access the restricted archives.

---

## Concepts Used in This Project

### 1. Cookies  

Cookies are small pieces of data stored on the client side and sent with every HTTP request. They are often used to store session information or tokens.

**Example in code:**
```javascript
// Set a cookie
app.get('/', (req, res) => {
    res.cookie("name", "hasrh");
    res.send("done");
});

// Read cookies
app.get("/read", (req, res) => {
    console.log(req.cookies);
    res.send("read page");
});
```

### 2. Encryption and Decryption

Encryption is the process of converting plain text into a coded format, and decryption is the reverse process. In this project, we use bcrypt for encryption and decryption of passwords.

**Example in code:**
```javascript
// Encrypt a password
app.get('/', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("password", salt, (err, hash) => {
            console.log(hash);
        });
    })
});

// Decrypt and compare password
app.get('/', (req, res) => {
    const hashedPassword = "$2b$10$zkU/97SAg4Vx1WksWtKH.u.NTYp4mWOm9HqobIsXEjq5geksGLIeW";
    bcrypt.compare("password", hashedPassword, (err, result) => {
        console.log(result); // true if password matches
    });
});
```

### 3. JWT (JSON Web Tokens)

JWT is a compact, URL-safe means of representing claims to be transferred between two parties. In this project, we use JWT for user authentication and authorization.

**Example in code:**
```javascript
// Create a JWT token and set it as a cookie
app.get('/', (req, res) => {
    const token = jwt.sign({ email: "suryasubharyan@gmail.com"}, "secretkey");
    res.cookie("token", token);
    res.send("JWT token created and cookie set");
});

// Protected route that requires JWT verification
app.get('/protected', (req, res) => {
   let data = jwt.verify(req.cookies.token, "secretkey");
   console.log(data);
   res.send("Protected route accessed");
});
```