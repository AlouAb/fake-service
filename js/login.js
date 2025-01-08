document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');

    // Kiểm tra và điền thông tin đã lưu
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        rememberMe.checked = true;
    }

    // Xử lý hiển thị/ẩn mật khẩu
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Thay đổi icon
        const icon = this.querySelector('i');
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
    });

    // Xử lý đăng nhập
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = passwordInput.value;

        // Lưu email nếu chọn ghi nớ
        if (rememberMe.checked) {
            localStorage.setItem('savedEmail', email);
        } else {
            localStorage.removeItem('savedEmail');
        }

        const user = authenticateUser(email, password);
        
        if (user) {
            setCurrentUser(user);
            alert('Đăng nhập thành công!');
            window.location.href = '/index.html';
        } else {
            alert('Email hoặc mật khẩu không chính xác!');
            passwordInput.value = ''; // Xóa mật khẩu đã nhập
        }
    });
});
