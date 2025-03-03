import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./BreedSelector.module.css"; // Ensure correct import

const API_KEY = "live_WJ2hod17ALfuQ2nhGyKdY3NOy5jWIpKQlszDM6bu4YmUaDk9asjkld5EbHR0nvlk"; // Store in .env for security

export default function BreedSelector({ setSelectedBreed, classCss, selectorClassCss }) {
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const { data } = await axios.get("https://api.thedogapi.com/v1/breeds", {
                    headers: { "x-api-key": API_KEY }
                });
                setBreeds(data);
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        };
        fetchBreeds();
    }, []);

    return (
        <div className={classCss}>
            <select
                id="breed-select"
                onChange={(e) => setSelectedBreed(e.target.value)} // Use prop to update breed
                className={selectorClassCss}
            >
                <option>All breeds</option>
                {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
