import image from "../../assets/img/illustration_404.svg";
import styles from "../../styles/Error.css";

// lỗi Not Found
// Các file được yêu cầu không có trên máy chủ.
// Có thể bởi vì những file này đã bị xóa, hoặc chưa từng tồn tại trước đây.
// Nguyên nhân thường là do lỗi chính tả trong URL.

export default function Error404() {
  return (
    <div id="error404">
      <div id="error-text">
        <span>Sorry, page not found!</span>
        <p>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>
        <input type="image" src={image} alt="image" />
        <div id="copyright">
          <br></br>
          <a
            className="back"
            title="Igniel"
            href="/welcome"
            style={{ color: "white" }}
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
