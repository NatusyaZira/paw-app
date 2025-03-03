import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Correct hook for getting dynamic params
import axios from "axios";
import Tabs from "../components/Tabs";
import CommonActions from "../components/CommonActions.jsx";
import Spinner from "../components/Spinner.jsx"
import classes from "./BreedInfo.module.css";

const API_KEY = "live_WJ2hod17ALfuQ2nhGyKdY3NOy5jWIpKQlszDM6bu4YmUaDk9asjkld5EbHR0nvlk"; // Store API key securely

export default function BreedInfo() {
    const { breedId } = useParams(); // Get the breedId from URL params
    const [breedData, setBreedData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBreedDetails = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `https://api.thedogapi.com/v1/images/${breedId}`,
                    { headers: { "x-api-key": API_KEY } }
                );
                setBreedData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching breed details:", error);
                setLoading(false);
            }
        };

        if (breedId) {
            fetchBreedDetails();
        }
    }, [breedId]); // Re-fetch data when breedId changes

    if (loading) {
        return 
            <Spinner />

    }

    if (!breedData || !breedData.breeds || breedData.breeds.length === 0) {
        return <>
        <Tabs classCss="tabs-container">
            <CommonActions label="BREEDS" />
        </Tabs>
        <div className={classes["detail-container"]}> 
            <p>Breed not found!</p>
            </div>
        </>
    }

    // Extract the breed data
    const breed = breedData.breeds[0];

    // Safely access the properties, providing fallback values if necessary
    const breedName = breed.name || "N/A";
    const bredFor = breed.bred_for || "N/A";
    const origin = breed.origin || "N/A";
    const lifeSpan = breed.life_span || "N/A";
    const temperament = breed.temperament || "N/A";
    const weightMetric = breed.weight?.metric || "N/A";

    return (<>

                 <Tabs classCss="tabs-container">
                    <CommonActions label="BREEDS" />
                </Tabs>
            <div className={classes["detail-container"]}> 
            <div className={classes["data-img-wrapper"]}>
            <img src={breedData.url} alt={breedName} />
            </div>
            <div className={classes["data-wrapper"]}>
            <div className={classes["prime-info"]}>
                <h2>{breedName}</h2>
                <p>{bredFor}</p>
            </div>    
            <div className={classes["ditail-info-wrapper"]}>  
                <div className={classes["temperament-info"]}>
                    <p><strong>Temperament:</strong><br/> {temperament}</p>   
                </div>
                <div className={classes["all-info"]}>
                    <p><strong>Origin:</strong> {origin}</p>
                    <p><strong>Life Span:</strong> {lifeSpan}</p>
                    <p><strong>Weight:</strong> {weightMetric} kg</p>
                </div>
            </div>  
            </div>
        </div>
    </>
        
    );
}
