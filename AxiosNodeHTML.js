const path = require("path");
const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Base URL for the API
//const base_url = "https://api.example.com";
const base_url = "http://localhost:3000";

// Set the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static (__dirname + '/public'));

app.use(cookieParser());

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/music'); //เข้าถึงDB music
        res.render("home", { musics: response.data, Role: req.cookies.role, User: req.cookies.username});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error root');
    }
});

// กดปุ่มเพลงเศร้าแล้วlinkไปที่plylistเพลงเศร้า
app.get("/playlist_sad", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/music'); //เข้าถึงDB music
        const musics = response.data; //ให้ res ดึงข้อมูลจาก DB มาใส่ในตัวแปร
        
        let datas = []; // สร้างตัวแปรมาเก็บข้อมูล
        for (let music of musics) {
            if (music.genre === 'เศร้า') { // check genre
                const response2 = await axios.get(base_url + '/music/' + music.id); // หากเจอ genre เศร้าสามารถดึงข้อมูลมาทั้งแถว
                const data = response2.data; // เอาข้อมูลของแถวมาเก็บในตัวแปร
                datas.push(data); // ใส่ข้อมูลลงไปใน array
            }
        }
        return res.render("playlist_sad", { muscis_sad: datas, Role: req.cookies.role, User: req.cookies.username }); // ส่งค่าไปหน้า playlist_sad ใน {} ซ้าย เป็นตัวแปรและเก็บค่า data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error playlist_sad');
    }
});

// กดปุ่มเพลงเศร้าแล้วlinkไปที่plylistเพลงรัก
app.get("/playlist_love", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/music'); //เข้าถึงDB music
        const musics = response.data; //ให้ res ดึงข้อมูลจาก DB มาใส่ในตัวแปร
        
        let datas = []; // สร้างตัวแปรมาเก็บข้อมูล
        for (let music of musics) {
            if (music.genre === 'รัก') { // check genre
                const response2 = await axios.get(base_url + '/music/' + music.id); // หากเจอ genre เศร้าสามารถดึงข้อมูลมาทั้งแถว
                const data = response2.data; // เอาข้อมูลของแถวมาเก็บในตัวแปร
                datas.push(data); // ใส่ข้อมูลลงไปใน array
            }
        }
        return res.render("playlist_love", { muscis_love: datas, Role: req.cookies.role, User: req.cookies.username }); // ส่งค่าไปหน้า playlist_sad ใน {} ซ้าย เป็นตัวแปรและเก็บค่า data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error playlist_love');
    }
});

// กดปุ่มเพลงเศร้าแล้วlinkไปที่plylistเพลงสากล
app.get("/playlist_modern", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/music'); //เข้าถึงDB music
        const musics = response.data; //ให้ res ดึงข้อมูลจาก DB มาใส่ในตัวแปร
        
        let datas = []; // สร้างตัวแปรมาเก็บข้อมูล
        for (let music of musics) {
            if (music.genre === 'สากล') { // check genre
                const response2 = await axios.get(base_url + '/music/' + music.id); // หากเจอ genre เศร้าสามารถดึงข้อมูลมาทั้งแถว
                const data = response2.data; // เอาข้อมูลของแถวมาเก็บในตัวแปร
                datas.push(data); // ใส่ข้อมูลลงไปใน array
            }
        }
        return res.render("playlist_modern", { muscis_modern: datas, Role: req.cookies.role, User: req.cookies.username }); // ส่งค่าไปหน้า playlist_modern ใน {} ซ้าย เป็นตัวแปรและเก็บค่า data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error playlist_modern');
    }
});

// กดปุ่มเพลงเศร้าแล้วlinkไปที่plylistเพลงฮิต
app.get("/playlist_hit", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/music'); //เข้าถึงDB music
        const musics = response.data; //ให้ res ดึงข้อมูลจาก DB มาใส่ในตัวแปร
        
        let datas = []; // สร้างตัวแปรมาเก็บข้อมูล
        for (let music of musics) {
            if (music.genre === 'ฮิต') { // check genre
                const response2 = await axios.get(base_url + '/music/' + music.id); // หากเจอ genre เศร้าสามารถดึงข้อมูลมาทั้งแถว
                const data = response2.data; // เอาข้อมูลของแถวมาเก็บในตัวแปร
                datas.push(data); // ใส่ข้อมูลลงไปใน array
            }
        }
        return res.render("playlist_hit", { muscis_hit: datas, Role: req.cookies.role, User: req.cookies.username }); // ส่งค่าไปหน้า playlist_hit ใน {} ซ้าย เป็นตัวแปรและเก็บค่า data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error playlist_hit');
    }
});

app.get("/music_detail/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/music/' + req.params.id); //เข้าถึงDB music และเข้าถึง id
        return res.render("music_detail", { muscis_detail: response.data, Role: req.cookies.role, User: req.cookies.username }); // ส่งค่าไปหน้า playlist_hit ใน {} ซ้าย เป็นตัวแปรและเก็บค่า data
    } catch (err) {
        console.error(err);
        res.status(500).send('Error music_detail');
    }
});

app.get("/login", (req,res) => {
    try {
        return res.render("login", {Fail: ""});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error login');
    }
})

app.post("/login2", async (req,res) => { //check login
    try {
        const response = await axios.get(base_url + "/user");
        const users = response.data;

        let checkFail = true;
        for (let user of users) {
            if (req.body.username === user.username) {
                if (req.body.password === user.password) {
                    checkFail = false;
                    if (user.role === 'admin') {
                        res.cookie('role', 'admin', {maxAge: 9000000, httpOnly: true}); // อยู่ใน web ได้ 15 นาที || 900k ms
                    } else if (user.role === 'user') {
                        res.cookie('role', 'user', {maxAge: 9000000, httpOnly: true});
                    } 
                    res.cookie('username', user.username, {maxAge: 9000000, httpOnly: true});
                    return res.redirect("/");
                }
            } 
        }

        if (checkFail) {
            return res.render("login", {Fail: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"}); // ส่งข้อมูลของ role และ fail เช็คว่าชื่อผู้ใช้กับรหัสผิดหรือไม่ ไปหน้า login 
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error register2');
    }
})

app.get("/register", (req,res) => {
    try {
        return res.render("register");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error register');
    }
})

// port คือการรับข้อมูล หรือ แก้ไข
app.post("/register2", async (req,res) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age
        }

        await axios.post(base_url + "/user", data);
        return res.redirect("/"); // redirect คือการไปที่หน้านั้นเลยโดยไม่ส่งข้อมูล
    } catch (err) {
        console.error(err);
        res.status(500).send('Error register2');
    }
})

app.get("/logout", (req,res) => {
    try {
        res.clearCookie('role');
        res.clearCookie('username');
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error register');
    }
})

// app.get("/info/:id", async (req, res) => {
//     try {
//         const response = await axios.get(base_url + '/music/' + req.params.id); //เข้าถึงDB music และเข้าถึง id
//         return res.render("info", { info: response.data }); // ส่งค่าไปหน้า playlist_hit ใน {} ซ้าย เป็นตัวแปรและเก็บค่า data
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error info');
//     }
// });

app.listen(5500, () => console.log('Server started on port http://localhost:5500'));