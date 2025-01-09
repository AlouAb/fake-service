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

    const bankSelect = document.getElementById('bankName');
    console.log('bankSelect:', bankSelect);

    const bankLogo = document.getElementById('bankLogo');
    console.log('bankLogo:', bankLogo);

    const bankNameDisplay = document.getElementById('bankNameDisplay');
    console.log('bankNameDisplay:', bankNameDisplay);

    // Object chứa đường dẫn logo của các ngân hàng
    const bankLogos = {
        'Vietcombank': 'assets/banks/vietcombank.png',
        'BIDV': 'assets/banks/bidv.png',
        'Techcombank': 'assets/banks/techcombank.png',
        'ACB': 'assets/banks/acb.png',
        'MB Bank': 'assets/banks/mbbank.png'
    };

    // Chỉ thực hiện khi tìm thấy tất cả các phần tử
    if (bankSelect && bankLogo && bankNameDisplay) {
        bankSelect.addEventListener('change', function() {
            try {
                const selectedOption = this.options[this.selectedIndex];
                const logoPath = selectedOption.getAttribute('data-logo');
                
                console.log('Selected bank:', this.value);
                console.log('Logo path:', logoPath);
                
                if (logoPath) {
                    bankLogo.src = logoPath;
                    bankLogo.style.display = 'inline-block';
                }
                
                bankNameDisplay.textContent = this.value + ' -';
            } catch (error) {
                console.error('Lỗi khi cập nhật:', error);
            }
        });

        // Kích hoạt sự kiện change
        bankSelect.dispatchEvent(new Event('change'));
    } else {
        console.error('Thiếu một hoặc nhiều phần tử HTML cần thiết:', {
            'bankSelect exists': !!bankSelect,
            'bankLogo exists': !!bankLogo,
            'bankNameDisplay exists': !!bankNameDisplay
        });
    }
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
    // Lấy phần tử chứa bill
    const billElement = document.querySelector('.bill-container');
    
    // Chuyển đổi phần tử thành hình ảnh
    html2canvas(billElement).then(canvas => {
        // Tạo link tải xuống
        const link = document.createElement('a');
        link.download = 'mbbank-bill.png';
        link.href = canvas.toDataURL('image/png');
        
        // Trigger click để tải xuống
        link.click();
    });
}
