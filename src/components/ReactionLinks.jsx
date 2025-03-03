import { NavLink} from "react-router-dom";
import DislikeBtn from "./DislikeBtn.jsx";
import LikeBtn from "./LikeBtn.jsx";
import FavouriteBtn from "./FavouriteBtn.jsx";
import classes from "./ReactionLinks.module.css";
function ReactionButtons () {
    return (<div className={classes["reaction-btn-style"]}>
                <NavLink to="/dislikes" className={({isActive}) => (isActive ? classes.active : undefined)}><DislikeBtn/></NavLink>
                <NavLink to="/favourites" className={({isActive}) => (isActive ? classes.active : undefined)}><FavouriteBtn /></NavLink>
                <NavLink to="/likes" className={({isActive}) => (isActive ? classes.active : undefined)}><LikeBtn /></NavLink>       
           </div>)
}
export default ReactionButtons;