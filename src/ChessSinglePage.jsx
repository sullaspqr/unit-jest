import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export const ChessSinglePage =()=> {

    const params = useParams();
    const id = params.chessId;
    const[chess,setChess] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://chess.sulla.hu/chess/${id}`)
            const chess = await res.json();
            setChess(chess);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
 }, [id]);

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !chess.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">Sakkozó neve: {chess.name}</h5>
                                <div className="lead">Születési éve: {chess.birth_date}</div>
                                <div className="lead">Nyert világbajnokságai: {chess.world_ch_won}</div>
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
                                  </div>
                                  <div><NavLink to="/"><i className="bi bi-backspace"></i></NavLink> &nbsp;&nbsp;&nbsp;
<NavLink key="y" to={"/mod-chess/" + chess.id}><i className="bi bi-pencil"></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}

