import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material';

const Panel = ({records, retrieveRecords, setShowModal, setMode,setID}) => {

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:5000/artists/${id}`)
        retrieveRecords()
    }

    const handleDetails = async (id) => {
        navigate(`/director/${id}`)
    }

    const handleEdit = async(id) => {
        setShowModal(true);
        setMode('Edit');
        setID(id);
    }

    useEffect(() => {
        retrieveRecords();
    }, [])

    return (
        
        !records?.length?(<div style={{display:'flex',flexDirection:'row',justifyContent:'center',minHeight:'90vh',alignItems:'center'}}><CircularProgress/></div>):<div className='panel'>
            <div className="py-5">
                <div className="container">
                    <div className="row hidden-md-up">
                            {records.map((record, pid) => {
                                return (
                                    <div className="col-md-3"  key={pid} style={{padding:"20px"}}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={record.attributes.image_url} className="card-img-top" alt="Director's Pic" height="350px" style={{padding:"10px"}}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{record.attributes.name}</h5>
                                            <p className="card-text">
                                                <strong>Genre: </strong>{record.attributes.genre}<br/>
                                                <strong>Birth Date: </strong>{record.attributes.birth_date}<br/>
                                                <strong>Description: </strong><span style={{textAlign:"justify"}}>{record.attributes.description.substring(0,120)}...</span></p>
                                            <div className="editor-panel">
                                                <button onClick={()=>{handleDetails(record.id)}} className="btn btn-primary">Details</button>
                                                <button onClick={()=>{handleEdit(record.id)}} className="btn btn-success">Edit</button>
                                                <button onClick={()=>{handleDelete(record.id)}} className="btn btn-danger">Delete</button>
                                            </div>       
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                    </div><br />
                </div>
            </div>
        </div>
    )
}

export default Panel