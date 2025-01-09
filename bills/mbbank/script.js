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

    // Khởi tạo datetime picker
    flatpickr("#transactionTime", {
        enableTime: true,
        dateFormat: "H:i - d/m/Y",
        time_24hr: true,
        locale: "vn",
        defaultDate: new Date(),
        minuteIncrement: 1,
        onChange: function(selectedDates, dateStr) {
            // Cập nhật preview nếu cần
            updatePreview();
        }
    });
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

    // Lấy giá trị thời gian
    const timeValue = document.getElementById('transactionTime').value;
    
    // Cập nhật text overlay
    const timeText = document.querySelector('.time-text');
    if (timeText) {
        timeText.textContent = timeValue;
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

// Thêm event listener cho input thời gian
document.getElementById('transactionTime').addEventListener('change', updatePreview);

// Gọi updatePreview lần đầu khi trang load
document.addEventListener('DOMContentLoaded', function() {
    updatePreview();
});

function updateDateTime() {
    const now = new Date();
    
    // Format date và time theo định dạng của MB Bank
    const date = now.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '.');  // Thay / bằng .
    
    const time = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    // Gộp date và time theo format của MB Bank
    const dateTimeText = `${date} ${time}`;
    
    // Tìm element có class time-text và cập nhật nội dung
    const timeElement = document.querySelector('.time-text');
    if (timeElement) {
        timeElement.textContent = dateTimeText;
    }
}

// Cập nhật thời gian mỗi phút
setInterval(updateDateTime, 60000);

// Chạy ngay khi trang load
document.addEventListener('DOMContentLoaded', updateDateTime);