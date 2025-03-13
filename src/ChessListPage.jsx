import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const ChessListPage=()=> {

    const[chesses,setChess] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        fetch("https://chess.sulla.hu/chess")
            .then((res) => res.json())
            .then((sakkok) => setChess(sakkok))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Sakkozók</h2>
                    {chesses.map((chess, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">Sakkozó neve: {chess.name}</p>
                            <p className="text-danger">Születési éve: {chess.birth_date}</p>
                            <p className="text-danger">Nyert világbajnokságai: {chess.world_ch_won}</p>
                            <div className="card-body">
{/* Feltételes NavLink az abszolút URL-hez */}
{chess.profile_url.startsWith('http') ? (
                                    <a href={chess.profile_url} target="_blank" rel="noopener noreferrer">
                                        Profile link
                                    </a>
                                ) : (
                                    <NavLink to={chess.profile_url} exact>
                                        Profile link
                                    </NavLink>
                                )}
                                <br />
                                <NavLink key={chess.id} to={"/chess/" + chess.id}>
                                    <img alt={chess.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={chess.image_url ? chess.image_url :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <br />
                                <NavLink key="x" to={"/mod-chess/" + chess.id}>
                                    <i className="bi bi-pencil"></i></NavLink> &nbsp;&nbsp;
                                    <NavLink key="y" to={"/del-chess/" + chess.id}><i className="bi bi-trash3"></i></NavLink>
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}
