import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';

const Infobox = (props) => {
    return (
        <Card className="infoBox">
            <CardContent>
                {/** Title i.e Coronavirus */}
                <Typography className="infoBox__title" color="textSecondary">
                    {props.title}
                </Typography>

                {/** Number os cases */}
                <h2 className="infoBox__cases">
                    {props.cases}
                </h2>

                {/** Total of cases */}
                <Typography className="infoBox__total" color="textSecondary">
                    {props.total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
