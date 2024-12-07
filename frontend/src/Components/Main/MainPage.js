import React from "react";
import { Main } from "./Main";
import { Main_ColorDuplicatePicker } from "./Main_ColorDuplicatePicker";
import { Main_GetTextureBits } from "./Main_GetTextureBits";

const MainPage = () => {
    return (
        <div>
            <Main />
            <Main_ColorDuplicatePicker />
            <Main_GetTextureBits />
        </div>
    );
};

export default MainPage;