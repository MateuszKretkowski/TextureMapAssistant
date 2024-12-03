import { useEffect, useState } from "react";


export const Items = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch("http://127.0.0.1:8000/items/")
        .then((response) => response.json())
        .then((data) => setItems(data.items))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
    
    return (
        <div>
            <h1>Items from Django API</h1>
            <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
      </div>
    )
}