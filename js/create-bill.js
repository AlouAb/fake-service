document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        amount: document.getElementById('amount'),
        receiverName: document.getElementById('receiverName'),
        accountNumber: document.getElementById('accountNumber'),
        bankName: document.getElementById('bankName'),
        description: document.getElementById('description'),
        time: document.getElementById('time'),
        cornerTime: document.getElementById('cornerTime')
    };

    // Xử lý input số tiền
    inputs.amount.addEventListener('input', function() {
        const amount = formatMoney(this.value);
        document.getElementById('previewAmount').textContent = amount;
    });

    // Xử lý input tên người nhận
    inputs.receiverName.addEventListener('input', function() {
        document.getElementById('previewReceiverName').textContent = 
            this.value.toUpperCase();
    });

    // Xử lý input số tài khoản
    inputs.accountNumber.addEventListener('input', function() {
        document.getElementById('previewAccountNumber').textContent = this.value;
    });

    // Xử lý thay đổi thời gian
    inputs.time.addEventListener('input', function() {
        document.querySelector('.date-text').textContent = this.value;
    });

    // Xử lý thay đổi thời gian góc
    inputs.cornerTime.addEventListener('input', function() {
        document.querySelector('.time-text').textContent = this.value;
    });

    // Xử lý thay đổi ngân hàng
    inputs.bankName.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const bankName = selectedOption.value;
        const logoFile = selectedOption.dataset.logo;
        
        // Cập nhật logo và tên ngân hàng trong form
        document.getElementById('selectedBankLogo').src = `assets/banks/${logoFile}`;
        document.getElementById('selectedBankName').textContent = bankName;
        
        // Cập nhật preview
        document.getElementById('previewBankLogo').src = `assets/banks/${logoFile}`;
        document.getElementById('bankNameDisplay').textContent = bankName;
    });

    // Xử lý input nội dung
    inputs.description.addEventListener('input', function() {
        document.getElementById('previewDescription').textContent = 
            `${this.value} chuyen tien`;
    });

    // Hàm cập nhật thông tin ngân hàng trong preview
    function updateBankInfo() {
        const selectedOption = inputs.bankName.options[inputs.bankName.selectedIndex];
        const logoFile = selectedOption.dataset.logo;
        const bankName = selectedOption.value;
        const bankCode = getBankCode(bankName);
        
        // Cập nhật logo và text trong preview bill
        const previewLogo = document.getElementById('bankLogoPreview');
        const previewInfo = document.getElementById('previewBankInfo');
        
        previewLogo.src = `assets/banks/${logoFile}`;
        previewInfo.textContent = `${bankName} (${bankCode}) - MF991563`;
    }

    // Hàm lấy mã ngân hàng
    function getBankCode(bankName) {
        const bankCodes = {
            'MB Bank': 'MB',
            'Vietcombank': 'VCB',
            'BIDV': 'BIDV',
            'Techcombank': 'TCB',
            'ACB': 'ACB',
            'VPBank': 'VPB',
            'TPBank': 'TPB',
            'Agribank': 'AGR'
        };
        return bankCodes[bankName] || 'MB';
    }

    // Khởi tạo giá trị mặc định
    document.getElementById('previewAmount').textContent = "545,454,545";
    document.getElementById('previewReceiverName').textContent = "HOANG THIEN TUNG";
    document.getElementById('previewBankInfo').textContent = "MBBank (MB) - 565656565";
    document.getElementById('previewDescription').textContent = "VI VAN LUC chuyen tien";

    // Cập nhật select ngân hàng trong HTML
    const bankSelect = document.getElementById('bankName');
    bankSelect.innerHTML = `
        <option value="MB Bank" data-logo="mbbank-mini.png">MB Bank</option>
        <option value="Vietcombank" data-logo="vietcombank-mini.png">Vietcombank</option>
        <option value="BIDV" data-logo="bidv-mini.png">BIDV</option>
        <option value="Techcombank" data-logo="techcombank-mini.png">Techcombank</option>
        <option value="ACB" data-logo="acb-mini.png">ACB</option>
        <option value="VPBank" data-logo="vpbank-mini.png">VPBank</option>
        <option value="TPBank" data-logo="tpbank-mini.png">TPBank</option>
        <option value="Agribank" data-logo="agribank-mini.png">Agribank</option>
    `;
});

function formatMoney(amount) {
    amount = amount.replace(/[^\d]/g, '');
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function downloadBill() {
    html2canvas(document.querySelector('.bill-container')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'mbbank-bill.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
