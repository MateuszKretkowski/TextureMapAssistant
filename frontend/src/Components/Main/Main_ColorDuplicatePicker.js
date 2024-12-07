import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar";
import normalmapreworked from "../images/normalmapreworked.png"
import "./header.css"

export const Main_ColorDuplicatePicker = () => {
    const nav = useNavigate();
    return (
        <div className="Main">
            <div className="main_container twisted">
                <div className="left_side">
                    <div className="titles-wrapper">
                        <h2 className="title">Do you have a problem with your M A P?</h2>
                        <h2 className="title">Let's not have a wasting-time session trying to pick 
                            any errors with your own image.
                        </h2>
                    </div>
                    <div>
                        <h1 className="Subtitle">Color Duplicate Picker is here for you.</h1>
                        <h3 className="para">Just pass in the map you wanna check, and BAM! You have
                            2 cases: One, in which you need to go to Color Painter, and second, where you are 
                            free to Make your animation dreams go TRUE!
                        </h3>
                        <button style={{marginTop: "24px"}} onClick={() => {nav("/color-duplicate-picker")}}>
                        Check Color Duplicates
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