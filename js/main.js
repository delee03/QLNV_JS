// gọi get tag by ID
function getElementByID(id) {
    return document.getElementById(id);
}

let arrNhanVien = getLocalStorage();
renderEmployee();

// Hàm để kiểm tra và hiển thị thông báo lỗi validation
function getValueEmployee() {
    const formInput = document.querySelectorAll(
        "#formInfo input, #formInfo select"
    );
    let employee = new NhanVien();
    let isValid = true;

    for (let itemInput of formInput) {
        let { id, value } = itemInput;
        employee[id] = value;
        let dataValidation = itemInput.getAttribute("data-validation");
        var thongBao = document.querySelectorAll(".sp-thongbao");
        thongBao.forEach(function (item) {
            item.style.display = "block";
        });
        let parentTag = itemInput.closest(".form-group"); // tìm thẻ cha của input gần nhất .form-group
        let errorTag = parentTag
            ? parentTag.querySelector(".sp-thongbao")
            : null;

        if (!errorTag) {
            console.error(`Error tag not found for ${id}`);
            continue;
        }

        let isEmpty = checkEmptyValue(value, errorTag);
        if (!isEmpty) {
            isValid = false;
            console.log(
                `Checking ${id}, isEmpty: ${isEmpty}, isValid: ${isValid}`
            );
            continue;
        }

        switch (dataValidation) {
            case "checkUserName":
                if (!checkUserName(value, errorTag)) isValid = false;
                break;
            case "checkFullName":
                if (!checkFullName(value, errorTag)) isValid = false;
                break;
            case "checkEmail":
                if (!checkEmailValue(value, errorTag)) isValid = false;
                break;
            case "checkPass":
                if (!checkPasswordValue(value, errorTag)) isValid = false;
                break;
            case "checkLuongCB":
                if (!checkLuongCB(value, errorTag)) isValid = false;
                break;
            case "checkGioLam":
                if (!checkGioLam(value, errorTag)) isValid = false;
                break;
            default:
                break;
        }
        console.log(`Sau khi check, isValid: ${isValid}`);
    }
    console.log("Nhân viên là:", employee);
    return isValid ? employee : null;
}

getElementByID("btnAutoID").addEventListener("click", function () {
    var newID = autoIDPicker();
    document.getElementById("tknv").value = newID;
});

getElementByID("btnThemNV").addEventListener("click", function () {
    let employee = getValueEmployee();
    if (employee) {
        arrNhanVien.push(employee);
        saveLocalStorage();
        renderEmployee();
        document.getElementById("formInfo").reset();
        hienThiThongBao("Thêm nhân viên thành công", 2000, "bg-success");
        console.log("Employee added", employee);
        $("#myModal").modal("hide");
    } else {
        console.log("Validation failed");
    }
});

//thực hiện hàm lưu trữ local storage
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Lỗi khi lưu vào local Storaagee", error);
    } //chuyển thành JSON để lưu vào local
}

//lấy dữ liệu từ local Storage
function getLocalStorage(key = "arrNhanVien") {
    try {
        let dataLocal = localStorage.getItem(key);
        return dataLocal ? JSON.parse(dataLocal) : [];
    } catch (error) {
        console.error("Error getting from localStorage", error);
        return [];
    }
}

function renderEmployee(arr = arrNhanVien) {
    let content = "";
    for (let nv of arr) {
        let newEm = new NhanVien();
        Object.assign(newEm, nv);
        let {
            tknv,
            email,
            name,
            password,
            datepicker,
            luongCB,
            chucvu,
            gioLam,
        } = newEm;
        let tinhLuong = newEm.tinhLuong();
        let xepLoai = newEm.xepLoaiNV();

        content += `
        <tr>
            <td>${tknv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${datepicker}</td>
            <td>${chucvu}</td>
            <td>${tinhLuong}</td>
            <td>${xepLoai}</td>
            <td><button onclick="getInfoNhanVien('${tknv}')" class="btn btn-warning">Sửa</button></td>
            <td><button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger">Xóa</button></td>
        </tr>
        `;
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}

// function formatDate(dateString) {
//     if (!dateString) return "";
//     let [year, month, day] = dateString.split("-");
//     return `${day}/${month}/${year}`;
// }

//gọi nv truyền dữ liệu lên form
function getInfoNhanVien(maNV) {
    let nv = arrNhanVien.find((s) => s.tknv == maNV);
    if (nv) {
        $("#myModal").modal("show");
        let arrField = document.querySelectorAll(
            "#formInfo input, #formInfo select"
        );
        for (let tag of arrField) {
            let { id } = tag;
            tag.value = nv[id];
            if (id == "tknv") {
                tag.readOnly = true;
            }
        }
        console.log("lấy lên nv: ", nv);
    } else {
        console.error(`Không tìm thấy nhân viên với mã: ${nv.tknv}`);
    }
}

//update nhân viên
function updateNhanVien() {
    //tìm ra index và gán nv có index = new nv

    let newNV = getValueEmployee();

    if (!newNV) {
        return;
    }

    let index = arrNhanVien.findIndex((s) => s.tknv == newNV.tknv);

    // let index = arrNhanVien.findIndex((nv) => {
    //     return nv.tknv == newNV.tknv;
    // });
    if (index != -1) {
        arrNhanVien[index] = newNV;
        renderEmployee();
        saveLocalStorage();
        $("#myModal").modal("hide");
        hienThiThongBao("Cập nhật nhân viên thành công !", 2000, "bg-info");
    } else {
        console.error(`Không tìm thấy nhân viên với mã: ${maNV}`);
    }
}
getElementByID("btnCapNhat").onclick = updateNhanVien;

//delete nhân viên
function deleteNhanVien(maNV) {
    let index = arrNhanVien.findIndex((s) => s.tknv == maNV);
    if (index) {
        arrNhanVien.splice(index, 1);
        hienThiThongBao("Xóa nhân viên thành công", 2000, "bg-danger");
    } else {
        console.error(`Không tìm thấy nhân viên với mã: ${maNV}`);
    }

    renderEmployee();
    saveLocalStorage();
}

//search Employee
getElementByID("searchName").oninput = function (event) {
    let newKeyWord = removeVietnameseTones(event.target.value)
        .trim()
        .toLowerCase(); //lấy ra key từ input
    let filterByNameNV = [];
    //sử dụng include method từ keyword để kiểm tra key;
    //nếu có thì sẽ hiện ra
    filterByNameNV = arrNhanVien.filter((item, index) => {
        let nvName = removeVietnameseTones(item.name).trim().toLowerCase();
        console.log(nvName);
        return nvName.includes(newKeyWord); // tên nhân viên .includes(newKeyWord) => true |false
    });
    renderEmployee(filterByNameNV);
};

// XỬ LÝ SINH TỰ ĐỘNG ID (TÀI KHOẢN)
function autoIDPicker() {
    var min = 100000;
    var max = 999999;

    // HÀM TẠO SỐ RANDOM TỪ MIN - MAX
    function getRandomID(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        var randomNumber = Math.floor(Math.random() * (max - min + 1) + min); //công thức tạo số trong khoản max
        return randomNumber;
    }

    // LẤY SỐ RANDOM
    var newID = getRandomID(min, max);

    // TÌM TRONG MẢNG XEM CÓ TÀI KHOẢN TRÙNG KO
    while (layThongTinNV(newID) != undefined) {
        // NẾU CÓ THÌ TIẾP TỤC GỌI RANDOM RA SỐ KHÁC
        newID = getRandomID(min, max);
    }

    return newID;
}

// Giả sử layThongTinNV là hàm kiểm tra sự tồn tại của tknv
function layThongTinNV(id) {
    return arrNhanVien.find((nv) => nv.tknv == id);
}

//function xử lí thông báo
function hienThiThongBao(text, duration, className) {
    Toastify({
        text,
        duration,
        className,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true, //giống target = blank
        close: false,

        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            // background: "linear-gradient(to right, #00b09b, #0f0)",
            width: 300,
        },
        //  onClick: function () {}, // Callback after click
        backgroundColor: "red",
    }).showToast();
}
