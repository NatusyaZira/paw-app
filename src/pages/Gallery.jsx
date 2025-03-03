import { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import CommonActions from "../components/CommonActions";
import BreedSelector from "../components/BreedSelector";
import { OrderSelector } from "../components/OrderSelector";
import { TypeSelector } from "../components/TypeSelector.jsx";
import LimitSelector from "../components/LimitSelector";
import Spinner from "../components/Spinner.jsx";
import Modal from "../components/Modal"; // Import Modal
import axios from "axios";
import classes from "./Gallery.module.css";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(20);
    const [selectedBreed, setSelectedBreed] = useState("");
    const [sortOrder, setSortOrder] = useState("random");
    const [imageType, setImageType] = useState("all");
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const API_KEY = import.meta.env.VITE_DOG_APP_API_KEY;

    const fetchImages = async () => {
        setLoading(true);

        const breedParam = selectedBreed ? `&breed_id=${selectedBreed}` : "";
        const sortParam = sortOrder !== "random" ? `&order=${sortOrder}` : "";

        try {
            const { data } = await axios.get(
                `https://api.thedogapi.com/v1/images/search?limit=${limit}${breedParam}${sortParam}`,
                { headers: { "x-api-key": API_KEY } }
            );

            const filteredImages = data.filter(image => {
                const isStatic = /\.(jpg|png)$/i.test(image.url);
                return imageType === "all" || (imageType === "static" && isStatic) || (imageType === "animated" && !isStatic);
            });

            setImages(filteredImages);
        } catch (error) {
            console.error("Error fetching dog images:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [selectedBreed, limit, sortOrder, imageType, refreshKey]); 
    
    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    // Function to refresh images after upload
    const handleImageUploaded = () => {
        handleRefresh(); // Refresh Gallery images
    };

    return (
        <>
         {/* Open Modal Button */}
       
            <Tabs classCss="tabs-container">
                <CommonActions label="GALLERY" />
                <button onClick={() => setIsModalOpen(true)} className="upload-button">
                    Upload Image
                </button>
                
            </Tabs>
            <Tabs classCss={classes["selectios-tab"]}>
            <form className={classes['breed-option']}>
                    <div className={classes['form-group']}>
                        <label>Order</label>
                        <OrderSelector classCss={classes["gallery-selector-container"]} selectorClassCss={classes["gallery-selector"]} setSortOrder={setSortOrder}/>
                    </div>
                    <div className={classes['form-group']}>
                        <label>Type</label>
                        <TypeSelector classCss={classes["gallery-selector-container"]} selectorClassCss={classes["gallery-selector"]} setImageType={setImageType}/>
                    </div>
                    
            </form>
            <form className={classes['breed-limit']}>

                    <div className={classes['form-group']}>
                        <label>Breed</label>
                        <BreedSelector setSelectedBreed={setSelectedBreed} classCss={classes["gallery-selector-container"]} selectorClassCss={classes["gallery-selector"]}/>
                    </div>
                    <div className={classes["sub-section"]}>
                    <div className={classes['form-group']}>
                        <label>Limit</label>
                        <LimitSelector setLimit={setLimit} classCss={classes["gallery-selector-container"]} limitCss={`${classes["gallery-selector"]} ${classes.limit}`}/>
                        </div>
                    <button onClick={handleRefresh} className={classes["refresh-button"]}>
                        <svg height="15" width="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 489.645 489.645" xml:space="preserve">
<g>
	<path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
		c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
		c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
		c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
		C414.856,432.511,548.256,314.811,460.656,132.911z"/>
</g>
                        </svg>
                    </button>
                    
                    </div>

            </form>
            </Tabs>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onImageUploaded={handleImageUploaded} 
            />
            {loading && (
                                <Spinner />
                        )}
            <div className="image-grid-wrapper">
                <div className="image-grid">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        images.map((image) => (
                            <div key={image.id} className="image-container">
                                <img src={image.url} alt="Dog" className="item-img" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
