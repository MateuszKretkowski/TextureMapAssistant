import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar";
import normalmapreworked from "../images/normalmapreworked.png"
import "./header.css"

export const Main_SimpleColorPaint = () => {
    const nav = useNavigate();
    return (
        <div className="Main">
            <div className="main_container twisted">
                <div className="left_side">
                    <div className="titles-wrapper">
                        <h2 className="title">So, you have a Nightmare, where you need to color every pixel of your map individually</h2>
                        <h2 className="title">You wake up, but see:
                        </h2>
                    </div>
                    <div>
                        <h1 className="Subtitle">Simple Color Paint!</h1>
                        <h3 className="para">A ray of lightbeam in this cruel world! So poetic... he will need just the width and height of your map
                            just to re-pixelize your image.
                        </h3>
                        <button style={{marginTop: "24px"}} onClick={() => {nav("/simple-color-paint")}}>
                        Simple Color Paint
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