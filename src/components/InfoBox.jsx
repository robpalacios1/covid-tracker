import React from 'react';
import './InfoBox.css'
import { Card, CardContent, Typography} from '@material-ui/core';

const Infobox = ({ title, cases, active, total, ...props }) => {
    return (
        <Card 
            onClick={props.onClick}
            className={`infoBox ${active && 'infoBox--selected'}`}
        >
            <CardContent>
                {/** Title i.e Coronavirus */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/** Number os cases */}
                <h2 className="infoBox__cases">
                    {cases}
                </h2>

                {/** Total of cases */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
