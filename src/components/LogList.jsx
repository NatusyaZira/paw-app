import React from "react";
import classes from "./LogList.module.css";

const LogList = ({ logs }) => {
    // Reverse the logs array to show from earliest to latest
    const reversedLogs = [...logs].reverse();

    return (
        <div className={classes["log-container"]}>
            {reversedLogs.length === 0 ? (
                <p>Make your choice</p>
            ) : (
                reversedLogs.map((log, index) => (
                    <div key={index}>
                        <p>
                            <span className={classes.time}>{log.time}</span> - Image ID: <b>{log.imageId || "No ID"}</b> was added to <strong>{log.action} </strong> 
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default LogList;








