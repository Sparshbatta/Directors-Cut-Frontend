import React, { useEffect, useState } from "react";
import { CircularProgress, Paper, Typography, Divider } from '@mui/material'
import { useParams } from "react-router-dom";
import axios from 'axios'
import useStyles from './styles'

const Details = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [record, setRecord] = useState(null);

    const retriveDetails = async () => {
        const response = await axios.get(`http://localhost:5000/artists/${id}`);
        setRecord(response.data.data.attributes);
    }

    useEffect(() => {
        retriveDetails();
    }, [])
    return (
        !record ? (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', minHeight: '90vh', alignItems: 'center' }}><CircularProgress /></div>) : (
            <Paper style={{ padding: '20px', borderRadius: '15px', margin:"120px" }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">{record.name}</Typography>
                        <strong>Birth Date:</strong><Typography gutterBottom variant="h6" color="textSecondary" component="h2">{record.birth_date}</Typography>
                        <strong>Genre:</strong><Typography gutterBottom variant="h6" color="textSecondary" component="h2">{record.genre}</Typography>
                        <strong>Description:</strong><Typography gutterBottom variant="body1" component="p">{record.description}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={record.image_url || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={record.name} />
                    </div>
                </div>
            </Paper>
        )
    )
}

export default Details;