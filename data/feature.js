import {
  Video,
  Users,
  FileText,
  VideoOff,
  MessageSquare,
  BookOpen,
} from "lucide-react";

export const features = [
  {
    icon: <Video className="w-10 h-10 mb-4 text-primary" />,
    title: "Video Conferencing",
    description:
      "Connect face-to-face with your study group through high-quality video calls",
    status: "Added",
  },
  {
    icon: <Users className="w-10 h-10 mb-4 text-primary" />,
    title: "Group Management",
    description: "Create and manage study groups for different subjects easily",
    status: "Added",
  },
  {
    icon: <FileText className="w-10 h-10 mb-4 text-primary" />,
    title: "Document Sharing",
    description: "Share and collaborate on study materials in real-time",
    status: "Will be Added",
  },
  {
    icon: <VideoOff className="w-10 h-10 mb-4 text-primary" />,
    title: "Session Recording",
    description: "Record study sessions for future reference",
    status: "Will be Added",
  },
  {
    icon: <MessageSquare className="w-10 h-10 mb-4 text-primary" />,
    title: "Group Chat",
    description: "Communicate effectively with built-in messaging",
    status: "Will be Added",
  },
  {
    icon: <BookOpen className="w-10 h-10 mb-4 text-primary" />,
    title: "Resource Library",
    description: "Organize and access study materials in one place",
    status: "Added",
  },
];
