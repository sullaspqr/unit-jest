import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ChessModPage =()=> {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchChessData = async () => {
            try {
                const response = await axios.get(`https://chess.sulla.hu/chess/${id}`);
                setChess(response.data);
            } catch (error) {
                console.log('Error fetching chess data:', error);
            }
        };

        fetchChessData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setChess(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://chess.sulla.hu/chess/${id}`, chess)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log('Error updating chess data:', error);
        });
};

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Egy sakkozó módosítása</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="form-group row pb-3">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Sakkozó név:</label>
                    <div className="col-sm-9">
                        <input type="text" id="name" placeholder='name' name="name" className="form-control" defaultValue={chess.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label htmlFor="birth_date" className="col-sm-3 col-form-label">Születési dátum:</label>
                    <div className="col-sm-9">
                        <input type="date" id="birth_date" placeholder='birth_date' name="birth_date" className="form-control" defaultValue={chess.birth_date} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label htmlFor="world_ch_won" className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                    <div className="col-sm-9">
                        <input type="number" id="world_ch_won" placeholder='world_ch_won' name="world_ch_won" className="form-control" value={chess.world_ch_won.toString()} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" placeholder='profile_url' name="profile_url" className="form-control" defaultValue={chess.profile_url} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" placeholder='image_url' className="form-control" defaultValue={chess.image_url} onChange={handleInputChange}/>
                        {chess.image_url && <img src={chess.image_url} height="200px" alt={chess.name}/>}
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
};