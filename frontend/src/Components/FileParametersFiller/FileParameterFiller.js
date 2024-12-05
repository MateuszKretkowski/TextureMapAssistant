import { useState, useEffect } from "react";

export const FileParameterFiller = ({ data, setData, stringArray }) => {
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsToggled((prevState) => !prevState);
        }, 460);

        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const AddObjectToList = (name) => {
        setData((prevData) => ({
            ...prevData,
            objectsList: [...prevData.objectsList, name],
        }));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="fpf">
            <span>const data = &#123;</span>
            {stringArray?.map((key, index) => (
                <pre className="fpf_pre" key={index}>
                    {(stringArray.length > 4 && index !== stringArray.length - 1) | (stringArray.length < 4) && (
                        <>
                            {key}:{" "}
                            <input
                                type="number"
                                value={data[key] || ""}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                        </>
                    )}
                    {index === stringArray.length - 1 && stringArray.length > 4 && (
                        <>
                            {key}:{"text"}
                            <button
                                className="small_btn"
                                onClick={() => AddObjectToList(`Object ${data.objectsList.length + 1}`)}
                            >
                                Add New Object
                            </button>
                        </>
                    )}
                </pre>
            ))}
            {stringArray.length > 3 && (

                <div className="objects-wrapper">
                {data.objectsList?.map((item, index) => (
                    <div key={index} className="object-item">
                        <input
                            placeholder={`Object ${index + 1}`}
                            value={item}
                            className="alternative_input"
                            onChange={(e) => {
                                setData((prevData) => {
                                    const updatedObjects = [...prevData.objectsList];
                                    updatedObjects[index] = e.target.value;
                                    return { ...prevData, objectsList: updatedObjects };
                                });
                            }}
                            />
                        <button
                            className="small_btn"
                            onClick={() => {
                                setData((prevData) => ({
                                    ...prevData,
                                    objectsList: prevData.objectsList.filter((_, i) => i !== index),
                                }));
                            }}
                            >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            )} {(
                null
            )}
            <div>
                <span>&#125;</span>
                {isToggled ? "_" : ""}
            </div>
        </div>
    );
};
