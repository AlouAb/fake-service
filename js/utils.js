// Hàm kiểm tra user đã tồn tại
function isUserExists(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

// Hàm lưu user mới
function saveUser(userData) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Mã hóa mật khẩu đơn giản (trong thực tế nên dùng bcrypt)
    const hashedPassword = btoa(userData.password);
    
    const newUser = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
}

// Hàm xác thực đăng nhập
function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const hashedPassword = btoa(password);
    
    const user = users.find(u => u.email === email && u.password === hashedPassword);
    return user || null;
}

// Hàm lưu thông tin người dùng đang đăng nhập
function setCurrentUser(user) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
}

// Hàm lấy thông tin người dùng đang đăng nhập
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
}
