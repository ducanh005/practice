const Home = () => {
    return (
        <div className="home-container">
            <div className="mt-3">
                Yêu cầu:
                <br />
                Sử dụng Api từ trang web https://reqres.in/ để tạo website.
            </div>
            <div>
                Sử dụng thư viện React để taọ môt màn hình website cơ bản bao
                gồm các chức năng:
            </div>
            <ul>
                <li>1.Đăng nhập</li>
                <li>2.Thêm User</li>
                <li>3.Sửa User </li>
                <li>4.Xóa User </li>
                <li>5.Hiển thị tât cả các User </li>
                <li>6.Tìm kiếm User theo id </li>
                <li>7.Sắp xếp theo FirstName</li>
                <li>8.Import User từ file .csv </li>
                <li>9.Export User từ file .csv </li>
            </ul>
        </div>
    );
};
export default Home;
