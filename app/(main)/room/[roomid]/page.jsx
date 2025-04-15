"use client";

import dynamic from "next/dynamic";

const ZegoRoomClient = dynamic(() => import("@/components/ZegoRoomClient"), {
  ssr: false,
});

const RoomPage = ({ params }) => {
  const { roomid } = params;
  return <ZegoRoomClient roomid={roomid} />;
};

export default RoomPage;
