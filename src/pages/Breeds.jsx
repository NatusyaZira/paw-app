import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tabs from "../components/Tabs";
import CommonActions from "../components/CommonActions";
import BreedSelector from "../components/BreedSelector";
import LimitSelector from "../components/LimitSelector";
import Spinner from "../components/Spinner";
import classes from "../components/BreedSelector.module.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_DOG_APP_API_KEY; // Store API key securely

export default function Breeds() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(20); // ✅ Add limit state
    const [selectedBreed, setSelectedBreed] = useState(""); // Track selected breed

    useEffect(() => {
        fetchImages(selectedBreed, limit); // ✅ Fetch images when limit or breed changes
    }, [limit, selectedBreed]); // ✅ Re-fetch when limit or breed changes

    const fetchImages = async (breedId, limit) => {
        setLoading(true);
    
        try {
            const { data } = await axios.get(
                breedId
                    ? `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=${limit}`
                    : `https://api.thedogapi.com/v1/images/search?limit=${limit}`,
                { headers: { "x-api-key": API_KEY } }
            );
            setImages(data);
        } catch (error) {
            console.error("Error fetching breed images:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Tabs classCss="tabs-container">
            <CommonActions label="BREEDS" />
            <BreedSelector setSelectedBreed={setSelectedBreed} classCss={classes["selector-container"]} selectorClassCss={`${classes["breed-select"]} ${classes["breed"]}`}/>
            <LimitSelector setLimit={setLimit} classCss={classes["selector-container"]} limitCss={`${classes["breed-select"]} ${classes["limit"]}`}/>
        </Tabs>
      

        
        {loading && (

                    <Spinner />

            )}

            {!loading && (
                <div className="image-grid-wrapper">
                <div className="image-grid">
                    {images.map((image) => (
                        <div key={image.id} className="image-container">
                            <Link to={`/breeds/${image.id}`} className="image-link">
                                <img src={image.url} alt="Breed" className="item-img" />
                            </Link>
                        </div>
                    ))}
                </div>
                </div>
            )}
        
    </>
    );
}
