// một thẻ chứa thông báo
// value dữ liệu người dùng nhập

// Kiểm tra xem người dùng đã nhập dữ liệu hay chưa (kiểm tra rỗng)
function checkEmptyValue(value, errorTag) {
    if (!value) {
        errorTag.innerHTML = "Không được để trống";
        return false;
    }
    errorTag.innerHTML = "";
    return true;
}

function checkUserName(value, errorTag) {
    const regex = /^[0-9]{6,10}$/;
    if (!regex.test(value)) {
        errorTag.innerHTML =
            "Tài khoản phải là số và có độ dài từ 6 đến 10 ký tự";
        return false;
    }
    errorTag.innerHTML = "";
    return true;
}

function checkMinMaxValue(value, errorTag, min, max) {
    if (value.length < min || value.length > max) {
        errorTag.innerHTML = `Độ dài phải từ ${min} đến ${max} ký tự`;
        return false;
    }
    errorTag.innerHTML = "";
    return true;
}

function checkFullName(value, errorTag) {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value)) {
        errorTag.innerHTML = "Họ tên chỉ chứa chữ cái và khoảng trắng";
        return false;
    }
    errorTag.innerHTML = "";
    return true;
}

function checkEmailValue(value, errorTag) {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value)) {
        errorTag.innerHTML = "Email không hợp lệ";
        return false;
    }
    errorTag.innerHTML = "";
    return true;
}

function checkPasswordValue(value, errorTag) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!regex.test(value)) {
        if (errorTag)
            errorTag.innerHTML =
                "Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm ít nhất 1 chữ in hoa, ít nhất 1 chữ thường, và ít nhất 1 kí tự đặt biệt";
        return false;
    }
    if (errorTag) errorTag.innerHTML = "";
    return true;
}

function checkLuongCB(value, errorTag) {
    if (isNaN(value) || value < 1000000 || value > 20000000) {
        errorTag.innerHTML = "Lương cơ bản phải từ 1,000,000 đến 20,000,000";
        return false;
    }
    errorTag.innerHTML = "";
    return true;
}

function checkGioLam(value, errorTag) {
    if (isNaN(value) || value < 80 || value > 200) {
        errorTag.innerHTML = "Giờ làm phải từ 80 đến 200 giờ";
        return false;
    }
    errorTag.innerHTML = "";
    return true;
}
