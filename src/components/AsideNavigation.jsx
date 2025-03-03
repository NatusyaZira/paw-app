import { Link, useLocation } from "react-router-dom";
import classes from "./AsideNavigation.module.css";
import ReactionLinks  from "./ReactionLinks";



function AsideNavigation () {
    const {pathname} = useLocation();
    return <div className={classes.navigation} >
                    <form className={classes.search} >
                    <input type="text" placeholder="Search for breeds" name="search-breed"></input>
                    <Link to="/search" className={(pathname === "/search") ? classes.active : ""}><button className = {classes["search-btn"]} type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg></button></Link>
                    </form>
                <ReactionLinks classCss={classes["reaction-btn-style"]}/>       
            </div>
}

export default AsideNavigation;