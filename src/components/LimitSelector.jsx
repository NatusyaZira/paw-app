import classes from "./BreedSelector.module.css";
export default function LimitSelector({ setLimit, classCss, limitCss}) {
    const handleLimitChange = (event) => {
        setLimit(Number(event.target.value)); // Update limit state
    };

    return (
        <div className={classCss}>
            <select id="limit" className={limitCss} onChange={handleLimitChange} defaultValue={20}> {/* Set defaultValue to 20 */}
                <option value={5}>5 items per page</option>
                <option value={10}>10 items per page</option>
                <option value={15}>15 items per page</option>
                <option value={20}>20 items per page</option>
            </select>
        </div>
    );
}