import { useEffect, useState } from "react";
import { FileParameterFiller } from "../FileParametersFiller/FileParameterFiller";
import normalmapreworked from "../images/normalmapreworked.png";
import "./gtb.css";

export const SimpleColorPaint = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textResponse, setTextResponse] = useState({
    text: "",
    details: "",
  });
  const [imgData, setImgData] = useState(normalmapreworked);

  const [data, setData] = useState({
    width: 16,
    height: 16,
    mapWidth: 4,
    mapHeight: 5,
    objectsList: [], // Ensure this is updated with values before sending
  });

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

    if (!data.width || !data.height) {
      setError("Width and height are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("texturePath", imgData);
      formData.append("width", data.width);
      formData.append("height", data.height);

      const response = await fetch(
        "http://127.0.0.1:8000/api/simple_color_paint/",
        {
          method: "POST",
          body: formData,
        }
      );
      
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Wyświetl lub pobierz obraz
    const a = document.createElement("a");
    a.href = url;
    a.download = "colormap.png"; // Nazwa pliku
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
      
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
          <FileParameterFiller
              data={data}
              setData={setData}
              stringArray={[
                "width",
                "height",
              ]}
            />
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
        <div className="button-wrapper button_margin">
          <button onClick={fetchResponse} disabled={loading}>
            {loading ? "Loading..." : "Color"}
          </button>
        </div>
        {textResponse.message != "" && <p className="error">{textResponse.text}</p>}
        {textResponse.details != "" && <p className="error">{textResponse.details}</p>}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </div>
  );
};
