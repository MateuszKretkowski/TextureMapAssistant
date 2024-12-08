import React from "react";
import { Main } from "./Main";
import { Main_ColorDuplicatePicker } from "./Main_ColorDuplicatePicker";
import { Main_GetTextureBits } from "./Main_GetTextureBits";
import { Main_SimpleColorPaint } from "./Main_SimpleColorPaint";
import { Main_ColorPaintWithShades } from "./Maint_ColorPaintWithShades";
import Footer from "../Footer/Footer";

const MainPage = () => {
    return (
        <div>
            <Main />
            <Main_ColorDuplicatePicker />
            <Main_GetTextureBits />
            <Main_SimpleColorPaint />
            <Main_ColorPaintWithShades />
            <Footer />
        </div>
    );
};

export default MainPage;