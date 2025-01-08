document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');

    // Kiểm tra độ mạnh mật khẩu
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/\d/)) strength++;
        if (password.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    }

    // Cập nhật thanh độ mạnh mật khẩu
    password.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        passwordStrength.className = 'password-strength';
        
        if (this.value === '') {
            passwordStrength.className = 'password-strength';
        } else if (strength < 2) {
            passwordStrength.classList.add('weak');
        } else if (strength < 4) {
            passwordStrength.classList.add('medium');
        } else {
            passwordStrength.classList.add('strong');
        }
    });

    // Validation khi submit form
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Mật khẩu không khớp');
        } else {
            // Gửi dữ liệu đăng ký
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                password: password.value
            };

            // Gửi request API đăng ký
            registerUser(formData);
        }

        form.classList.add('was-validated');
    });

    // Reset validation khi nhập lại
    confirmPassword.addEventListener('input', function() {
        this.setCustomValidity('');
    });
});

// Hàm gửi request đăng ký
async function registerUser(formData) {
    try {
        // Kiểm tra email đã tồn t�i
        if (isUserExists(formData.email)) {
            alert('Email này đã được đăng ký!');
            return;
        }

        // Lưu thông tin user mới
        const newUser = saveUser(formData);
        
        if (newUser) {
            setCurrentUser(newUser);
            alert('Đăng ký thành công!');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau!');
    }
}
