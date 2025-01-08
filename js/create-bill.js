document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các input fields
    const inputs = document.querySelectorAll('input, select');
    
    // Thêm event listener cho mỗi input để cập nhật realtime
    inputs.forEach(input => {
        ['input', 'change', 'keyup'].forEach(event => {
            input.addEventListener(event, updatePreview);
        });
    });

    // Cập nhật preview lần đầu
    updatePreview();

    initializeBankSelect();
});

function formatMoney(amount) {
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

    // Cập nhật thông tin ngân hàng
    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('receiverAccount').value || '';
    document.getElementById('previewBankInfo').textContent = `${bankName} - ${accountNumber}`;

    // Cập nhật nội dung chuyển khoản
    const description = document.getElementById('description').value;
    document.getElementById('previewDescription').textContent = description;

    // Cập nhật mã giao dịch
    const transactionId = document.getElementById('transactionId').value;
    document.getElementById('previewTransactionId').textContent = transactionId;

    // Cập nhật thời gian
    const transactionTime = document.getElementById('transactionTime').value;
    if (transactionTime) {
        const [time, date] = transactionTime.split(' - ');
        document.getElementById('previewTime').textContent = time;
        document.getElementById('previewDate').textContent = `${time} - ${date}`;
    }
}

// Hàm chỉnh sửa tên ngân hàng
function editBank() {
    const bankSelect = document.getElementById('bankName');
    const newBank = prompt('Nhập tên ngân hàng:', bankSelect.value);
    if (newBank) {
        let option = Array.from(bankSelect.options).find(opt => opt.value === newBank);
        if (!option) {
            option = new Option(newBank, newBank);
            bankSelect.add(option);
        }
        bankSelect.value = newBank;
        updatePreview();
    }
}

$(document).ready(function() {
    $('#bankName').select2({
        templateResult: formatBank,
        templateSelection: formatBank
    });
});

function formatBank(bank) {
    if (!bank.id) {
        return bank.text;
    }
    
    const logo = $(bank.element).data('logo');
    return $(`
        <div class="bank-option">
            <img src="${logo}" alt="${bank.text}"/>
            <span>${bank.text}</span>
        </div>
    `);
}