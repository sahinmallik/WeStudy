"use client";

import { Card, CardContent } from "@/components/ui/card";

const VideoPlayer = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      <Card className="overflow-hidden w-full">
        <CardContent className="p-2 sm:p-4">
          <div className="aspect-video relative">
            <video
              muted
              loop
              playsInline
              className="rounded"
              onMouseEnter={(e) => {
                e.currentTarget.currentTime = 0;
                e.currentTarget.play();
              }}
              onMouseLeave={(e) => {
                e.currentTarget.currentTime = 0;
                e.currentTarget.pause();
              }}
            >
              <source src="/example.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPlayer;
