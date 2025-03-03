import { useNavigate } from "react-router-dom";
import classes from "./CommonActions.module.css";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <button className={classes["back-button"]} onClick={() => navigate(-1)} >
            <svg version="1.0" viewBox="0 0 50.000000 50.000000"
 ><g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" stroke="none">
<path d="M235 360 l-110 -110 112 -112 c90 -89 115 -110 125 -100 10 10 -8 33
-87 112 l-100 100 99 99 c86 86 108 121 78 121 -4 0 -57 -50 -117 -110z"/>
</g>
</svg>
        </button>
    );
}

