document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }

    // Hiển thị thông tin người dùng
    document.getElementById('userGreeting').textContent = `Xin chào, ${currentUser.fullName}`;
    document.getElementById('userName').textContent = currentUser.fullName;
});

function handleLogout() {
    logout();
    window.location.href = './login.html';
} 