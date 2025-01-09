document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các input và select
    const inputs = document.querySelectorAll('input, select');
    
    // Thêm event listener cho mỗi input để cập nhật realtime
    inputs.forEach(input => {
        ['input', 'change', 'keyup'].forEach(event => {
            input.addEventListener(event, updatePreview);
        });
    });

    // Cập nhật preview lần đầu
    updatePreview();
});

function formatMoney(amount) {
    // Xóa tất cả ký tự không phải số
    amount = amount.replace(/[^\d]/g, '');
    // Thêm dấu phẩy sau mỗi 3 số
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updatePreview() {
    // Cập nhật số tiền
    const amount = document.getElementById('amount').value || '';
    const formattedAmount = formatMoney(amount);
    document.getElementById('previewAmount').textContent = formattedAmount + ' VND';

    // Cập nhật tên người nhận
    const receiverName = document.getElementById('receiverName').value || '';
    document.getElementById('previewReceiverName').textContent = receiverName.toUpperCase();

    // Cập nhật thông tin ngân hàng và số tài khoản
    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('accountNumber').value || '';
    document.getElementById('previewBankInfo').textContent = `${bankName} - ${accountNumber}`;

    // Cập nhật nội dung chuyển khoản
    const description = document.getElementById('description').value || '';
    document.getElementById('previewDescription').textContent = description;

    // Cập nhật thời gian
    const time = document.getElementById('time').value;
    if (time) {
        const [timeStr, dateStr] = time.split(' - ');
        document.getElementById('previewTime').textContent = timeStr;
        document.getElementById('previewDate').textContent = time;
    }
}

// Thêm sự kiện input cho trường số tiền để format realtime
document.getElementById('amount').addEventListener('input', function(e) {
    let value = e.target.value;
    // Chỉ giữ lại số
    value = value.replace(/[^\d]/g, '');
    // Format với dấu phẩy
    if (value) {
        value = formatMoney(value);
    }
    e.target.value = value;
});

// Thêm sự kiện input cho trường tên để tự động viết hoa
document.getElementById('receiverName').addEventListener('input', function(e) {
    e.target.value = e.target.value.toUpperCase();
});

function downloadBill() {
    // Thêm code để tải bill sau
    alert('Tính năng đang được phát triển');
}