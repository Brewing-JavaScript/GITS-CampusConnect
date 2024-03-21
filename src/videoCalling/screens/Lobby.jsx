import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Lobby.css";
import { useSocket } from "../context/Socketprovider";
import api from "../../Api/Api";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const [loading, setLoading] = useState(false);
  console.log(socket);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      if (email) {
        api
          .post("/send-call-mail", { email, room })
          .then((res) => {
            if (res.status == 200) {
              setLoading(false);
              socket.emit("room:join", {
                email,
                room,
              });
            }
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.response.data.error);
          });
      } else {
        socket.emit("room:join", {
          email,
          room,
        });
      }
    },
    [email, room, socket]
  );

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(room);
      navigate(`/company-call/room/${room}`);
    },
    [navigate]
  );

  const { email: userEmail } = useParams();

  useEffect(() => {
    setEmail(userEmail);
  }, []);

  return (
    // <>
    //     {
    //         loading ? <Loader /> : <div className="container">
    //             <h1>Lobby</h1>
    //             <form className="form" onSubmit={(e) => handleSubmit(e, email, room)}>
    //                 {
    //                     email && <>
    //                         <label htmlFor="email" className="label">Email ID</label>
    //                         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></>
    //                 }
    //                 <label htmlFor="room" className="label">Room No</label>
    //                 <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} className="input" />
    //                 <button type="submit" className="button">Join</button>
    //             </form>
    //         </div>
    //     }
    // </>
    // <>
    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <div className="min-h-screen flex justify-center items-center bg-gray-100">
    //       <div className="container max-w-md bg-white p-8 rounded-lg shadow-md">
    //         <h1 className="text-2xl font-semibold mb-4 text-center">Lobby</h1>
    //         <form
    //           className="form space-y-4"
    //           onSubmit={(e) => handleSubmit(e, email, room)}
    //         >
    //           {email && (
    //             <div className="flex flex-col">
    //               <label htmlFor="email" className="text-sm font-medium">
    //                 Email ID
    //               </label>
    //               <input
    //                 type="email"
    //                 id="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 className="input"
    //               />
    //             </div>
    //           )}
    //           <div className="flex flex-col">
    //             <label htmlFor="room" className="text-sm font-medium">
    //               Room No
    //             </label>
    //             <input
    //               type="text"
    //               id="room"
    //               value={room}
    //               onChange={(e) => setRoom(e.target.value)}
    //               className="input"
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
    //           >
    //             Join
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </>
    <div
      style={{
        backgroundColor: "#eceff180",
        width: "50%",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
        <h1
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Lobby
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            style={{
              width: "100%",
              height: "40px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "5px",
            }}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <input
            type="text"
            style={{
              width: "100%",
              height: "40px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "5px",
            }}
            placeholder="Enter room number"
          />
        </div>
      </div>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <button
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "1px solid #007bff",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Enter Room
        </button>
      </div>
    </div>
  );
};

export default Lobby;
