import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import axios from "axios";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const roomResponse = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(roomResponse.data);
    } catch (error) {
      console.log("error message", error);
    }
  };

  const createRoom = async (newRoom) => {
    try {
      const createdRoom = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms`,
        newRoom
      );

      setRooms([...rooms, createdRoom.data]);
    } catch (error) {
      console.log("error message", error);
    } // to do : call BE to create a room
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(
        `	https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (error) {
      console.log("error message: ", error);
    }
    // to do : call BE to delete a room
  };

  // fetchRooms();
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="__main">
      <div className="main__chatbody">
        <center>
          <Routes>
            <Route
              path="/room/:roomSlug"
              element={<ChatRoom rooms={rooms} />}
            />
            <Route
              exact
              path="/"
              element={
                <ChatRoomsList
                  rooms={rooms}
                  createRoom={createRoom}
                  deleteRoom={deleteRoom}
                />
              }
            />
          </Routes>
        </center>
      </div>
    </div>
  );
};

export default App;
