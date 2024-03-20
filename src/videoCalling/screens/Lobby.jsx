import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Lobby.css';
import { useSocket } from '../context/Socketprovider';
import api from '../../Api/Api';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader'

const Lobby = () => {
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');
    const socket = useSocket();
    const [loading, setLoading] = useState(false);
    console.log(socket);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setLoading(true)
        if (email) {
            api.post('/send-call-mail', { email, room }).then((res) => {
                if (res.status == 200) {
                    setLoading(false)
                    socket.emit('room:join', {
                        email, room
                    });
                }
            })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.response.data.error)
                })
        }
        else {
            socket.emit('room:join', {
                email, room
            });
        }




    }, [email, room, socket]);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);

        return () => {
            socket.off('room:join', handleJoinRoom);
        };

    }, [socket]);

    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data;
        console.log(room);
        navigate(`/company-call/room/${room}`);

    }, [navigate]);

    const { email: userEmail } = useParams()

    useEffect(() => {
        setEmail(userEmail)
    }, [])

    return (
        <>
            {
                loading ? <Loader /> : <div className="container">
                    <h1>Lobby</h1>
                    <form className="form" onSubmit={(e) => handleSubmit(e, email, room)}>
                        {
                            email && <>
                                <label htmlFor="email" className="label">Email ID</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></>
                        }
                        <label htmlFor="room" className="label">Room No</label>
                        <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} className="input" />
                        <button type="submit" className="button">Join</button>
                    </form>
                </div>
            }
        </>
    );
};

export default Lobby;
