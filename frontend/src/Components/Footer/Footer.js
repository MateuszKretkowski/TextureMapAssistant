import { useNavigate } from "react-router-dom";
import "./footer.css"

const Footer = () => {
    const openInNewTab = () => {
        window.open("https://mateuszkretkowski.github.io/Final-Portfolio", "_blank");
      };

    return (
        <div className="footer">
            <div className="footer_container">
                <div className="footer_left_side">
                    <h5 className="subName">DESIGNED BY</h5>
                    <h5 className="subName">CREATED BY</h5>
                    <h5 className="subName">CODED BY</h5>
                </div>
                <div className="footer_right_side" onClick={openInNewTab}>
                    <h1 className="name">MATEUSZ KRETKOWSKI</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer;