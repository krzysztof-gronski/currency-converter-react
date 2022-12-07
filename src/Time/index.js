import { useState, useEffect } from "react";
import "./style.css";

const Time = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const formattedDate = date.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div className="time__container">
            <p className="time">
                <>Current time: {formattedDate}</>
            </p>
        </div>

    );
};

export default Time;