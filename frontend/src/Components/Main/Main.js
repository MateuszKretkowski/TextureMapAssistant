import { useNavigate } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar";
import normalmapreworked from "../images/normalmapreworked.png"
import "./header.css"

export const Main = () => {
    const nav = useNavigate();
    return (
        <div className="Main">
            <div className="main_container">
                <div className="left_side">
                    <div className="titles-wrapper">
                        <h2 className="title">Tired of Coloring your map Pixel by Pixel?</h2>
                        <h2 className="title">Or maybe you just need to check any Vournelabilities?</h2>
                    </div>
                    <div>
                        <h1 className="Subtitle">Texture Map Assistant is here for you.</h1>
                        <h3 className="para">He is ready to Help You make your Map Ready for TextureMapping. From Checking your
                        Colors, if there is an error, to Coloring your map in 4 different shades for easing your job to animate
                        your Player, Weapon, Enemy, and many more!</h3>
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