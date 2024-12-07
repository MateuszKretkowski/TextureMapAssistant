import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar";
import normalmapreworked from "../images/normalmapreworked.png"
import "./header.css"

export const Main_ColorPaintWithShades = () => {
    const nav = useNavigate();
    return (
        <div className="Main">
            <div className="main_container">
                <div className="left_side">
                    <div className="titles-wrapper">
                        <h2 className="title">You have much more Complicated sprite to animate, and do NOT like everything RANDOM??
                        </h2>
                    </div>
                    <div>
                        <h1 className="Subtitle">Meet Color Paint With Shadesss</h1>
                        <h3 className="para">Unlike Simple Color Paint, he will color your map with 4 different shades: Red, Green, Blue, Red (again, but at different ends).
                            This will speed up the process of animating your sprite, because of the SHADESSS!
                        </h3>
                        <button style={{marginTop: "24px"}} onClick={() => {nav("/color-paint-with-shades")}}>
                        Color Paint With SHADESSS
                    </button>
                    </div>
                </div>
                <div className="right_side">
                    <figure className="image-wrapper">
                        <img src={normalmapreworked} className="mapImage" />
                    </figure>
                </div>
            </div>
        </div>
    )
}