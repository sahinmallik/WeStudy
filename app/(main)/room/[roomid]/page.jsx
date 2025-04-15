import ZegoRoomClient from "@/components/ZegoRoomClient";
import { use } from "react";

const RoomPage = ({ params }) => {
  const { roomid } = use(params);

  return <ZegoRoomClient roomid={roomid} />;
};

export default RoomPage;
