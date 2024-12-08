import { useNavigate } from "react-router-dom"
import "./navbar.css"

export const NavBar = () => {
    const nav = useNavigate();
    return (
        <div className="Navbar">
        <div className='navbar_container'>
            <div className="button_list">
                <button>Color Duplicate Picker</button>
            </div>
            <div className='title_container' onClick={() => {nav("/")}}>
                <div className='title-left-side' onClick={() => {nav("/")}}>
                    <div className="title_left-side_word_big" onClick={() => {nav("/")}}>
                        <h1>TEXTURE</h1>
                    </div>
                    <div className='title_left-side_word' onClick={() => {nav("/")}}>
                        <h1>M</h1>
                        <h1>A</h1>
                        <h1>P</h1>
                    </div>
                </div>
                <div className="title_right-side_word" onClick={() => {nav("/")}}>
                    <h1>ASSISTANT</h1>
                </div>
            </div>
            <div className="button_list">
                <button>Color Painter Assistant</button>
            </div>
        </div>
        </div>
    )
}