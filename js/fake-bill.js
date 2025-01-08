document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = './login.html';
        return;
    }

    // Hiển thị thông tin người dùng
    document.getElementById('userGreeting').textContent = `Xin chào, ${currentUser.fullName}`;

    // Thêm sự kiện click cho các nút tạo bill
    const createBillButtons = document.querySelectorAll('.bank-card .btn');
    createBillButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bankName = this.closest('.bank-card').querySelector('h5').textContent;
            // Chuyển đến trang tạo bill với thông tin ngân hàng
            window.location.href = `./create-bill.html?bank=${encodeURIComponent(bankName)}`;
        });
    });
});

function handleLogout() {
    logout();
    window.location.href = './login.html';
} 