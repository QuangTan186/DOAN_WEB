import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Styles from "./SlideShow.scss"
import { Slide1,Slide2,Slide3,Slide4 } from "../../../assets/images";
const fadeImages = [
    Slide1,
    Slide2,
    Slide3,
    Slide4
  ];

export default function SlideShow () {
    return (
    <div className={Styles.slideContainer}>
        <Fade Styles={{ 
                height: '400px', 
                width: '100%',
                justifyContent: 'center',
               
            }}>
            <div className="each-fade">
                <img src={fadeImages[0]} 
                    style={{
                        width: '100%',
                        height: 400,
                        borderRadius:'10px',
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[1]} 
                    style={{
                        width: '100%',
                        height: 400,
                        borderRadius:'10px',
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[2]} 
                    style={{
                        width: '100%',
                        height: 400,
                        borderRadius:'10px',
                    }}
                />
            </div>
            <div className="each-fade">
                <img src={fadeImages[3]} 
                    style={{
                        width: '100%',
                        height: 400,
                        borderRadius:'10px',
                    }}
                />
            </div>
        </Fade>
    </div>    
    )
}
