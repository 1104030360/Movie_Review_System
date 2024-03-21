function confirmAdd() {
    // 獲取輸入值
    const businessNumber = document.getElementById('businessNumber').value;
    const name = document.getElementById('name').value;
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;

    // 建立新的放映商物件
    const newSupplier = {
        businessNumber: businessNumber,
        name: name,
        account: account,
        password: password,
        status: 'Active'// 預設狀態為 Active
    };

    // 將新的放映商資料儲存到 localStorage
    let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    suppliers.push(newSupplier);
    localStorage.setItem('suppliers', JSON.stringify(suppliers));

     // 返回帳號管理介面
    window.location.href = '3.2帳號管理介面.html';
}

function cancel() {
    // 返回帳號管理介面
    window.location.href = '3.2帳號管理介面.html';
}