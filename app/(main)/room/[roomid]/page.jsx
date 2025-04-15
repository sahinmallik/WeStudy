"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Use dynamic import with no SSR
const ZegoRoomClient = dynamic(() => import("@/components/ZegoRoomClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="text-xl font-semibold">Loading video conference...</div>
    </div>
  ),
});

// Make the page component async and properly handle params
export default async function RoomPage({ params }) {
  // Await params if needed (this ensures we follow Next.js guidance)
  const roomParams = await Promise.resolve(params);
  const roomid = roomParams.roomid;

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ZegoRoomClient roomid={roomid} />
    </Suspense>
  );
}
