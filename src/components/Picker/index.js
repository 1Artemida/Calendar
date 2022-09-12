import React from "react";
import './style.css'

const Picker = ({dayToday, prevButton, todayButton, nextButton}) => {

    return (
        <>
        <div className="container">
            <div className="picker_info">
                <div className="picker_title">{dayToday.format('MMMM')}</div>
                <div className="picker_text">{dayToday.format('YYYY')}</div>
            </div>
            <div className="picker_buttons">
                <button className="prev_button" onClick={prevButton}>←</button>
                <button className="today_button" onClick={todayButton}>Today</button>
                <button className="next_button" onClick={nextButton}>→</button>
            </div>
        </div>
        </>
    );
};

export default Picker;