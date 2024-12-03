import { useState } from "react";
import { FileParameterFiller } from "../FileParametersFiller/FileParameterFiller";
import normalmapreworked from "../images/normalmapreworked.png";
import "./gtb.css";

export const ColorDuplicatePicker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const fetchZip = async () => {
    if (!imgData) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("texturePath", imgData);
      formData.append("width", data.width);
      formData.append("height", data.height);
      formData.append("mapWidth", data.mapWidth);
      formData.append("mapHeight", data.mapHeight);
      data.objectsList.forEach((item) => {
        formData.append("objectsList", item);
      });

      const response = await fetch(
        "http://127.0.0.1:8000/api/get_texture_bits/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      // Pobieranie pliku ZIP
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "textures.zip";
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
                "mapWidth",
                "mapHeight",
                "objectsList",
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
        <div className="button-wrapper">
          <button onClick={fetchZip} disabled={loading}>
            {loading ? "Loading..." : "Get Texture Bits"}
          </button>
        </div>
        {error && <p className="error">Error: {error}</p>}
      </div>
    </div>
  );
};
