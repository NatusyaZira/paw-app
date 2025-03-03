import classes from "./Spinner.module.css";

export default function Spinner() {
    return <section className={classes["spinner-wrapper"]}><div className={classes.spinner}></div></section>
}