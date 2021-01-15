import React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import '../report.css'

export default function reportComponent({icon, label, bottomLabel}){

    function getIcon(){
        if(icon==="AccessTimeIcon")
             return <AccessTimeIcon style={{ fontSize: 70 }} />
        else if(icon==="DateRangeIcon")
             return <DateRangeIcon style={{ fontSize: 70 }} />
        else
            return <WhatshotIcon style={{ fontSize: 70 }} />
    }


    return(
        <>
            <div className="container">
                <div className="componentContainer">
                    <div className="componentContainerTop">
                        <div className="componentContainerTopIcon">
                            {getIcon()}
                        </div>
                        <h1 className="componentContainerTopLabel">{label}</h1>
                    </div>
                    <div className="componentContainerBottom">
                        <p className="componentContainerBottomLabel">{bottomLabel}</p>
                    </div>
                </div>
            </div>
        </>
    );
}