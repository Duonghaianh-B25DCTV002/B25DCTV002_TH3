# BÀI THỰC HÀNH 03: SỔ CHI TIÊU CÁ NHÂN

- Họ và tên: Dương Hải Anh
- Mã sinh viên: B25DCTV002
- Môn học: Lập trình Web

---

## 1. Cấu trúc thư mục

Dự án gồm hai phần theo yêu cầu của bài thực hành:

- part-a-class: Xây dựng ứng dụng hoàn toàn bằng Class Component.
- part-b-hooks: Xây dựng ứng dụng bằng Function Component kết hợp React Hooks.

---

## 2. Hướng dẫn chạy ứng dụng

Yêu cầu môi trường: Đã cài đặt Node.js trên máy.

### Chạy Phần A (Class Component)

Mở cửa sổ dòng lệnh và thực hiện các lệnh:

```bash
cd part-a-class
npm install
npm run dev
```

Truy cập địa chỉ hiển thị trên terminal (mặc định: http://localhost:5173).

### Chạy Phần B (Function Component + Hooks)

Mở một cửa sổ dòng lệnh khác và thực hiện các lệnh:

```bash
cd part-b-hooks
npm install
npm run dev
```

Truy cập địa chỉ hiển thị trên terminal (mặc định: http://localhost:5174).

Lưu ý: Phần B đã được cấu hình kết nối trực tiếp với MockAPI (endpoint expenses) để thực hiện các thao tác lấy danh sách, thêm và xóa khoản chi.

---

## 3. Hooks đã giúp khắc phục các thách thức của Class ở những chỗ nào trong bài

### 3.1. Gom cụm logic vòng đời thay vì phân mảnh (useEffect so với componentDidMount và componentWillUnmount)

- Trong Class Component (HeaderClock): Logic của bộ đếm thời gian bị phân tán ở hai nơi khác nhau. Việc khởi tạo interval nằm trong componentDidMount, còn việc xóa interval nằm trong componentWillUnmount. Khi component có nhiều tác vụ phụ (side effect), các logic không liên quan dễ bị trộn lẫn vào cùng một hàm vòng đời, gây khó đọc và dễ quên cleanup.
- Trong Hooks (useClock / useEffect): Toàn bộ vòng đời của timer (khởi tạo và xóa bỏ khi unmount) được đặt tập trung trong cùng một khối useEffect thông qua hàm return cleanup. Điều này giúp logic gắn kết chặt chẽ và loại bỏ nguy cơ rò rỉ bộ nhớ.

### 3.2. Khả năng tái sử dụng logic (Custom Hooks so với kế thừa / HOC của Class)

- Trong Class Component: Logic đếm giờ hay logic gọi API nếu muốn dùng lại cho nhiều component sẽ phải dùng kỹ thuật Higher-Order Component (HOC) hoặc Render Props, làm cấu trúc cây component bị lồng nhau phức tạp.
- Trong Hooks:
  - Custom hook useClock: Tách riêng logic đếm thời gian ra khỏi giao diện, có thể tái sử dụng ở bất kỳ component nào.
  - Custom hook useFetch: Đóng gói toàn bộ logic gọi API (lấy dữ liệu, thêm, xóa), kèm theo trạng thái tải (isLoading) và bắt lỗi (error). Component giao diện chỉ việc gọi hook mà không cần viết lại logic kết nối mạng.

### 3.3. Quản lý state độc lập và rõ ràng (useState so với this.state)

- Trong Class Component (App, ExpenseForm): Mọi state (danh sách chi tiêu, filter, dữ liệu form, thông báo lỗi) đều phải khai báo chung trong một đối tượng this.state. Cập nhật state phải dùng this.setState kèm cú pháp callback nếu phụ thuộc state cũ.
- Trong Hooks: useState cho phép tách nhỏ state thành từng biến đơn lẻ (name, amount, category, date, errors). Mỗi biến có hàm setter riêng, giúp việc cập nhật tường minh, giảm thiểu xung đột dữ liệu ngoài ý muốn.

### 3.4. Cập nhật tiêu đề trang và theo dõi thay đổi (useEffect so với componentDidUpdate)

- Trong Class Component: Việc đồng bộ tiêu đề tab trình duyệt theo tổng chi tiêu được viết trong componentDidUpdate. Hàm này chạy sau mỗi lần re-render, đòi hỏi lập trình viên phải tự so sánh props/state trước và sau nếu muốn tránh tính toán thừa.
- Trong Hooks: useEffect có mảng phụ thuộc (dependency array), chỉ thực thi lại khi giá trị được theo dõi thực sự thay đổi.

### 3.5. Truy cập Context và tham chiếu DOM đơn giản (useContext, useRef)

- Trong Class Component: Việc tiêu thụ Context đòi hỏi dùng cú pháp thẻ bọc Consumer rườm rà. Tạo ref cần thông qua React.createRef() trong constructor và liên kết phức tạp.
- Trong Hooks:
  - useContext(ThemeContext): Đọc trạng thái giao diện sáng/tối và hàm chuyển đổi trực tiếp chỉ với một dòng code.
  - useRef: Tạo tham chiếu trực tiếp đến ô nhập tên khoản chi (input), tự động focus lại con trỏ chuột ngay sau khi người dùng thêm thành công một khoản chi mới.

---

## 4. Các yêu cầu nâng cao đã thực hiện

1. Xây dựng custom hook useClock để tách biệt hoàn toàn logic thời gian thực khỏi giao diện.
2. Thống kê tổng số tiền chi tiêu theo từng nhóm danh mục riêng biệt (Ăn uống, Đi lại, Học tập, Giải trí).
3. Ô tìm kiếm khoản chi có áp dụng kỹ thuật độ trễ (debounce 500ms) bằng useRef kết hợp setTimeout, giảm tần suất lọc dữ liệu liên tục khi người dùng đang nhập phím.
4. Quản lý chế độ giao diện Sáng / Tối thông qua ThemeContext và useContext.

