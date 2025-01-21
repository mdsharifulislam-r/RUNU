"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

import { getSocket } from "@/lib/features/user.reducer";
import UserBoxAdd from "../Common/UserBox/UserBoxAdd";

export default function MainContainer() {
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_SOCKET_URL), []);
  const user = useAppSelector((state) => state.userReducer.user);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: number; socketId: string }[]
  >([]);
  useEffect(() => {
    socket.emit("get-online", user?.user_id);
  }, [socket.id]);

  const func = () => {
    socket.emit("all-users",{id:user?.user_id,search:text});
    socket.on("all-users", (users) => {
      if (users == onlineUsers) {
        return;
      }
      setOnlineUsers(users);
    });
  };

  useEffect(() => {
    func();
  }, [text]);

  const showUsers = onlineUsers?.map((item) => {
    if (item == undefined) {
      return;
    }
    return (
      <UserBoxAdd
        userId={item.userId}
        socketId={item.socketId}
        key={item.userId}
      />
    );
  });

  return (
    <div className="md:w-[40%] w-[100%] md:h-[90vh] h-screen overflow-y-scroll bg-gray-800 rounded-xl">
      <div className="header p-5">
        <div>
          <span className="text-gray-100 text-2xl font-bold">Add Friends</span>
        </div>
        <div>
          <input
            type="text"
            className="w-full py-2 px-4 mt-2 rounded-md bg-slate-700 focus:outline-none "
            placeholder="Search Here"
            onChange={(e)=>setText(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full p-5">{showUsers}</div>
    </div>
  );
}
