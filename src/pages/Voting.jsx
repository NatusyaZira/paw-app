import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Tabs from "../components/Tabs.jsx";
import CommonActions from "../components/CommonActions.jsx";
import DislikeBtn from "../components/DislikeBtn.jsx";
import LikeBtn from "../components/LikeBtn.jsx";
import FavouriteBtn from "../components/FavouriteBtn.jsx";
import LogList from "../components/LogList.jsx";
import Spinner from "../components/Spinner.jsx";
import classes from "./Voting.module.css";

const API_KEY = import.meta.env.VITE_DOG_APP_API_KEY;
const fetchRandomDog = async () => {
    const { data } = await axios.get("https://api.thedogapi.com/v1/images/search", {
        headers: { "x-api-key": API_KEY }
    });
    return data[0];
};

export default function Voting() {
    const { data: dogImage, isLoading, refetch } = useQuery({
        queryKey: ["randomDog"],
        queryFn: fetchRandomDog,
        refetchOnWindowFocus: false,
    });

    const handleVote = (imageId, value) => {
        const action = value === 1 ? "Likes" : value === 0 ? "Dislikes" : "Favourites";
        const storageKey = value === 1 ? "likes" : value === 0 ? "dislikes" : "favourites";
        const storedVotes = JSON.parse(localStorage.getItem(storageKey)) || [];
        const updatedVotes = [{ id: imageId, url: dogImage?.url }, ...storedVotes];
        localStorage.setItem(storageKey, JSON.stringify(updatedVotes));

        // Create log entry for the action
        const newLog = {
            time: new Date().toLocaleTimeString(),
            action,
            imageId,
        };
        const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
        storedLogs.push(newLog);
        localStorage.setItem("logs", JSON.stringify(storedLogs));

        // Refetch the dog image to show a new one after voting
        refetch();
    };

    // Get logs from localStorage to pass into LogList
    const logs = JSON.parse(localStorage.getItem("logs")) || [];

    return (
        <section className={classes["voting-container"]}>
            <Tabs classCss="tabs-container">
                <CommonActions label="VOTING" />
            </Tabs>
            <section className={classes["voting-content"]}>
                <div className={classes["img-reactions"]}>
                    <div className={classes["image-wrapper"]}>
                        {isLoading ? <Spinner /> : dogImage && <img className={classes["random-img"]} alt="Dog" src={dogImage.url} />}
                    </div>
                    <Tabs classCss={classes["voting-btn"]}>
                        <DislikeBtn onClickSad={() => handleVote(dogImage.id, 0)} />
                        <FavouriteBtn onClickFav={() => handleVote(dogImage.id, "Favourites")} />
                        <LikeBtn onClickLike={() => handleVote(dogImage.id, 1)} />
                    </Tabs>
                </div>
            </section>
            <LogList logs={logs} />
        </section>
    );
}
