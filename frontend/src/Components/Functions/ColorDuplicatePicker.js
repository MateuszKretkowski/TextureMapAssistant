import { useEffect, useState } from "react";
import { FileParameterFiller } from "../FileParametersFiller/FileParameterFiller";
import normalmapreworked from "../images/normalmapreworked.png";
import "./gtb.css";

export const ColorDuplicatePicker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textResponse, setTextResponse] = useState({
    text: "",
    details: "",
  });
  const [imgData, setImgData] = useState(normalmapreworked);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgData(file);
    }
  };

  useEffect(() => {
    console.log(textResponse)
  }, [textResponse])

  const fetchResponse = async () => {
    if (imgData == normalmapreworked || !imgData) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("texturePath", imgData);

      const response = await fetch(
        "http://127.0.0.1:8000/api/color_duplicate_picker/",
        {
          method: "POST",
          body: formData,
        }
      );
      const textResponseee = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      setTextResponse({
        text: await textResponseee.message,
        details: await textResponseee.details,
      });
      console.log(response, "response");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Main">
      <div className="main_container gtb_container">
        <div className="sides-wrapper">
          <div className="left_side gtb_left_side">
            <div>
              <h1>Do you have any problems with your Map?</h1>
              <h3>Let's check it right here. Input your image, and we will process this pixel-by-pixel, saving
                your time, and not irritating you.
              </h3>
            </div>
            <br />
            <div>
              <h3>
                Btw, Did you know that frogs use their eyeballs to help them swallow? 🐸👀 When they eat, they pull their eyes down into their mouths to push food down their throats. So, next time you see a frog blinking while eating, it's actually multitasking! 😂
              </h3>
            </div>
          </div>
          <div className="right_side gtb_rigth_side">
            {imgData && (
              <div className="image-wrapper">
                <img
                  src={
                    imgData === normalmapreworked
                      ? imgData
                      : URL.createObjectURL(imgData)
                  }
                  className="mapImage gtb_image"
                  alt="Texture"
                />
                <div>
                  <label htmlFor="myfile" className="custom-file-label">
                    <h5 className="input">Choose File</h5>
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="img_input"
                    id="myfile"
                    name="myfile"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="button-wrapper">
          <button onClick={fetchResponse} disabled={loading}>
            {loading ? "Loading..." : "Check Color Duplicates"}
          </button>
        </div>
        {textResponse.message != "" && <p className="error">{textResponse.text}</p>}
        {textResponse.details != "" && <p className="error">{textResponse.details}</p>}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </div>
  );
};
