/**
 * Thêm nhân viên, xóa, cập nhật
 * hiển thị lên table = local Storage
 *
 */

class NhanVien {
    tknv = "";
    name = "";
    email = "";
    password = "";
    datepicker = "";
    luongCB = "";
    chucvu = "";
    gioLam = "";

    tinhLuong = function () {
        let luong;
        switch (this.chucvu) {
            case "Sếp":
                luong = this.luongCB * 3;
                break;
            case "Trưởng phòng":
                luong = this.luongCB * 2;
                break;
            case "Nhân Viên":
                luong = this.luongCB;
                break;
            default:
                luong = 0;
                break;
        }
        return luong.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    xepLoaiNV = function () {
        if (this.gioLam >= 192) return "Xuất sắc";
        if (this.gioLam >= 176) return "Giỏi";
        if (this.gioLam >= 160) return "Khá";
        return "Trung bình";
    };
}
