import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import peer from '../service/peer';
import { useSocket } from '../context/Socketprovider';
// import './Room.css'; // Import CSS file for styling

const Room = () => {
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [addedTracks, setAddedTracks] = useState(new Set());

    const handleUserJoin = useCallback(({ email, id }) => {
        console.log(email, id, "join");
        setRemoteSocketId(id);
    }, []);

    const socket = useSocket();

    const sendStreams = useCallback(() => {
        if (myStream) {
            myStream.getTracks().forEach(track => {
                if (!addedTracks.has(track.id)) {
                    peer.peer.addTrack(track, myStream);
                    setAddedTracks(prevSet => new Set(prevSet).add(track.id));
                }
            });
        }
    }, [myStream, addedTracks, peer.peer]);

    const handleIncommitCall = useCallback(async ({ from, offer }) => {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream);
        const ans = await peer.getAns(offer);
        socket.emit('call:accepted', { to: from, ans });
    }, [socket]);

    const handleNegoIncomming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAns(offer);
        socket.emit('peer:nego:done', { to: from, ans });
    }, [socket]);

    const handleNegoFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        console.log("call acc ans", from, ans);
        peer.setLocalDescription(ans);
        sendStreams();
    }, [sendStreams]);

    const handleNegotiationNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }, [socket, remoteSocketId]);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        const offer = await peer.getOffer();
        socket.emit('user:call', { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleEndCall = useCallback(() => {
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop());
        }
        peer.peer.close();
        setRemoteSocketId(null);
        setMyStream(null);
        setRemoteStream(null);
        setAddedTracks(new Set());
    }, [myStream, peer.peer]);

    useEffect(() => {
        socket.on('user:join', handleUserJoin);
        socket.on('incomming:call', handleIncommitCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoIncomming);
        socket.on('peer:nego:final', handleNegoFinal);

        return () => {
            socket.off('user:join', handleUserJoin);
            socket.off('incomming:call', handleIncommitCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoIncomming);
            socket.off('peer:nego:final', handleNegoFinal);
        };
    }, [socket, handleUserJoin, handleIncommitCall, handleCallAccepted, handleNegoIncomming, handleNegoFinal]);

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegotiationNeeded);
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegotiationNeeded);
        };
    }, [handleNegotiationNeeded]);

    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remoteStream = ev.streams;
            console.log("got tracks");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    return (
        <div className="room-container">
            <div className="video-container">
                <div className="local-video">
                    {myStream && (
                        <ReactPlayer className="react-player" playing muted height="100%" width="100%" url={myStream} />
                    )}
                </div>
                <div className="remote-video">
                    {remoteStream && (
                        <ReactPlayer className="react-player" playing  height="100%" width="100%" url={remoteStream} />
                    )}
                </div>
            </div>
            <div className="controls">
                <button  onClick={handleCallUser}>
                    Call
                </button>
                <button onClick={handleEndCall} >
                    End Call
                </button>
            </div>
        </div>
    );
};

export default Room;
