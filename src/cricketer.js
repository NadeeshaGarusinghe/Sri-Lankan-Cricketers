import style from "./cricketer.module.css"
import React, { useEffect, useState } from "react";
import FullCricketer from './full_cricketer';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const Cricketer = ({ full_name, image, birth, town, school, age, batting_style, bawling_style }) => {
    const [open, setOpen] = useState(false);   //popup=>true
    const [scroll, setScroll] = React.useState('paper');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        //return <Slide direction="up" ref={ref} {...props} />;
        return <FullCricketer full_name={full_name} />
    });
    return (
        <div className={style.colmd4} >
            <div className={style.card}>
                <div >
                    <Dialog
                        fullScreen
                        scroll={scroll}
                        //open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}

                    />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        fullWidth={true}
                        maxWidth="xl"
                    >

                        <FullCricketer full_name={full_name} />
                    </Dialog>
                    <div className={style.avatar}>
                        <img
                            onClick={handleClickOpen}
                            src={image}
                            className="card-img-top"
                            alt=""
                        />
                    </div>
                    <h5 className={style.cardtitle}>
                        සම්පූර්ණ_නම:- {full_name}
                    </h5>
                    {birth !== '' && (
                        <h5 className={style.cardtitle}>
                            උපන්දිනය:- {birth}
                        </h5>
                    )}
                    {town !== '' && (
                        <h5 className={style.cardtitle}>
                            උපන්_ගම:- {town}
                        </h5>
                    )}
                    {school !== '' && (
                        <h5 className={style.cardtitle}>
                            පාසල:-  {school}
                        </h5>
                    )}
                    <h5 className={style.cardtitle}>
                        වයස:- {age}
                    </h5>
                    <h5 className={style.cardtitle}>
                        පිතිකරන_විලාසය:- {batting_style}
                    </h5>

                    {bawling_style !== '' && (
                        <h5 className={style.cardtitle}>
                            පන්දු_යවන_ඉරියව්ව:- {bawling_style}
                        </h5>
                    )}

                </div>

            </div>


        </div>

    );
};

export default Cricketer


