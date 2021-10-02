import React from "react";
import style from "./cricketer.module.css"
const Cricketer = ({ full_name, image, birth, school, age, batting_style }) => {
    return (
        <div className={style.cricketer}>
            <h3 >{full_name}</h3>
            <img className={style.image} src={image} alt="" />
            <h5>උපන්_ගම_සහ_වර්ෂය:- {birth}</h5>
            <h5>පාසල:- {school}</h5>
            <h5>වයස:- {age}</h5>
            <h5>පිතිකරන_විලාසය:- {batting_style}</h5>




        </div>
    );
};

export default Cricketer