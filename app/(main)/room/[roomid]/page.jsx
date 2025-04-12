import ZegoRoomClient from "@/components/ZegoRoomClient";

const RoomPage = ({ params }) => {
  const { roomid } = params;

  return <ZegoRoomClient roomid={roomid} />;
};

export default RoomPage;
