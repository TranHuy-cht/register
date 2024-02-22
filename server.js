const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình EJS làm template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware để parse body của request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Phục vụ các tệp tĩnh từ thư mục hiện tại
app.use(express.static(path.join(__dirname)));

// Route cho trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route để xử lý form đăng ký
app.post('/register', (req, res) => {
    // Lấy dữ liệu từ form
    const { fullName, email, password } = req.body;
    
    // Ví dụ: Lưu dữ liệu vào cơ sở dữ liệu tại đây
    
    // Sau khi xử lý, gửi lại dữ liệu người dùng đã đăng ký
    res.json({ fullName, email });
    console.log(fullName);
});

// Route cho các file CSS và JS (nếu cần)
app.get('*.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, req.path));
});

app.get('*.js', (req, res) => {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, req.path));
});

// Route để xử lý trang /register
app.get('/register', (req, res) => {
    // Lấy thông tin fullName và email từ query string
    const fullName = req.query.fullName;
    const email = req.query.email;
    // Render trang /register với thông tin fullName và email
    res.render('register', { fullName, email });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
