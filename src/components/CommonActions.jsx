import BackButton from "./BackButton";
import classes from "./CommonActions.module.css";

export default function CommonActions ({label}) {
    return <>
    <BackButton/>
    <label className={classes.label}>{label}</label>
    </>
}