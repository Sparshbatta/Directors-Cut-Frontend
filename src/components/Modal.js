import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';



const Modal = ({retrieveRecords, mode, setShowModal, entity, id }) => {
    const [data, setData] = useState({
        name: "",
        birth_date: "",
        description: "",
        genre: "",
        image_url: ""
    })

    const fetchUserDetails = async () => {
        const response = await axios.get(`http://localhost:5000/artists/${id}`);
        setData(response.data.data.attributes)
    }

    useEffect(()=>{
        if(mode=='Edit'){  
            fetchUserDetails();
        }
    },[]);

    const modalStyles = {
        "height": document.querySelector('.App').scrollHeight,
    }
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const editOperation = async () => {
        const finalDataBody = {
            "data":{
                "type":"artist",
                "attributes":data,
                "id":id
            }
        }
        await axios.patch(`http://localhost:5000/artists/${id}`, finalDataBody,{
            headers:{
                'Content-Type':'application/json'
            }
        });
    }

    const addOperation = async () => {
        const finalDataBody = {
            "data":{
                "type":"artist",
                "attributes":data
            }
        }
        await axios.post('http://127.0.0.1:5000/artists',finalDataBody,{
            headers:{
                'Content-Type':'application/json'
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(false);
        if(mode=='Edit'){
            await editOperation();
        }else{
            await addOperation();
        }
        await retrieveRecords();
        navigate('/');
    }

    return (
        <div className="overlay" style={modalStyles}>
            <div className="classic-model">
                <div className="form-title-container">
                    <h3>{mode} a {entity}</h3>
                    <h3><button className="btn btn-danger" onClick={() => { setShowModal(false) }}>X</button></h3>
                </div>
                <form encType='multipart/form-data'>
                    <input className="form-control" required maxLength={80} placeholder="Name of director" name="name" value={data.name} onChange={handleChange} />
                    <br />
                    <input type='date' value={data.birth_date} name='birth_date' onChange={handleChange}/>
                    <br />
                    <input className="form-control" required maxLength={80} placeholder="Enter Description" name="description" value={data.description} onChange={handleChange} />
                    <br />
                    <input className="form-control" required maxLength={80} placeholder="Enter Genre" name="genre" value={data.genre} onChange={handleChange} />
                    <br />
                    <input type='text'  placeholder="Enter Picture URL" className='form-control' required name='image_url' value={data.image_url} onChange={handleChange}/>
                    <br />
                    <input className="btn btn-success" type="submit" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default Modal;