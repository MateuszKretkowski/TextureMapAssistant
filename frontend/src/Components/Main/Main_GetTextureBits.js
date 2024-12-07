import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar";
import normalmapreworked from "../images/normalmapreworked.png"
import "./header.css"

export const Main_GetTextureBits = () => {
    const nav = useNavigate();
    return (
        <div className="Main">
            <div className="main_container">
                <div className="left_side">
                    <div className="titles-wrapper">
                        <h2 className="title">You have a Working map, but want each piece in individual
                            image?
                        </h2>
                    </div>
                    <div>
                        <h1 className="Subtitle">That's where GET TEXTURE BITS comes in handy!</h1>
                        <h3 className="para">For your creativity, we built a system, where you
                            can get every object from your map in their own file, so No more tidieusy
                            work!
                        </h3>
                        <button style={{marginTop: "24px"}} onClick={() => {nav("/get-texture-bits")}}>
                        GET TEXTURE BITS
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