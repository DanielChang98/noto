import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import '../../home.css'

export default function BottomHalf(){

    return(
        <div className="btmHalfContainer">
            <div className="btmHalfTitle">
                <h3 className="btmHalfH3">What can you do with Noto?</h3>
            </div>
            <div className="cardContainer">
                <Card className="card">
                    <CardMedia
                        className="cardImage"
                        image="/checklist.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" align="center">
                        Task Management
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="card">
                    <CardMedia
                        className="cardImage"
                        image="/checklist.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" align="center">
                        Team Collaboration
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="card">
                    <CardMedia
                        className="cardImage"
                        image="/timer.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" align="center">
                        Stay Motivated
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}