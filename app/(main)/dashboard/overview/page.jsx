"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowLeft,
  Bell,
  Book,
  Clock,
  Loader2,
  MessageSquare,
  UserPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { getSubjects } from "@/action/getSubjects";
import useFetch from "@/hooks/createSubject";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { getUserRecentActivity } from "@/action/getUserRecentActivity";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const { user } = useUser();
  const pathName = usePathname();
  const paths = pathName.split("/").filter(Boolean);
  const lastPath = paths.length == 2 ? paths[1] : " ";

  const {
    loading: updateLoading,
    fn: getGroupsFn,
    data: userDetails,
  } = useFetch(getSubjects);

  const {
    loading: activityLoading,
    fn: getActivityFn,
    data: userActivity,
  } = useFetch(getUserRecentActivity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getGroupsFn(), getActivityFn()]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Runs only once on mount

  console.log("User Details: ", userDetails);
  console.log("User Activity: ", userActivity);
  return (
    <div
      className="p-3 sm:p-4 md:p-6 bg-zinc-950 text-zinc-100"
      style={{ minHeight: "100%" }}
    >
      <div className="flex items-center mb-2">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="p-6 bg-zinc-950 text-zinc-100 min-h-screen">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-zinc-400">
            Continue your learning journey where you left off
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-zinc-300 text-lg">
                Current Subjects
              </CardTitle>
              <CardDescription className="text-zinc-500">
                Courses you're enrolled in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <p className="text-4xl font-bold text-amber-500">
                  {userDetails?.groups?.length || 0}
                </p>
                <Badge className="ml-2 bg-amber-950 text-amber-400 hover:bg-amber-900">
                  Active
                </Badge>
              </div>
            </CardContent>
            {/* <CardFooter className="text-zinc-400 text-sm">
              <Book className="h-4 w-4 mr-2 text-zinc-500" />
              {userDetails?.groups?.map((group, index) => {
                return index < 3 ? (
                  <span key={index} className="text-zinc-300">
                    {group.group.tag}
                    {index < Math.min(group.length, 3) - 1 && " ,  "}
                  </span>
                ) : index === 3 ? (
                  <span key={index} className="text-zinc-400">
                    {" "}
                    +{subjects.length - 3} more
                  </span>
                ) : null;
              })}
            </CardFooter> */}
          </Card>
        </div>
        {/* Forum Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-zinc-200">Subject Forums</h2>
            <Button
              variant="ghost"
              className="text-amber-500 hover:text-amber-400 hover:bg-zinc-900"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["ACA", "FOC", "ADBS", "Data Structures"].map((subject, index) => (
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 hover:border-amber-800 transition-all cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-zinc-200">{subject}</CardTitle>
                  <CardDescription className="text-zinc-500">
                    {index % 2 === 0
                      ? "3 new posts today"
                      : "12 active discussions"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-zinc-400">
                  Last post 2 hours ago by Professor Smith
                </CardContent>
                <CardFooter>
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <Avatar
                        key={i}
                        className="border-2 border-zinc-900 h-8 w-8"
                      >
                        <AvatarFallback className="bg-zinc-700 text-zinc-300 text-xs">
                          {["JS", "RK", "AM"][i]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-zinc-500 text-xs ml-2">
                    +17 participants
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-zinc-200">Recent Activity</h2>
            {/* <Button
              variant="ghost"
              className="text-amber-500 hover:text-amber-400 hover:bg-zinc-900"
            >
              See All
            </Button> */}
          </div>

          {activityLoading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin h-10 w-10 text-zinc-100" />
            </div>
          ) : (
            <Card className="bg-zinc-900 border-zinc-800">
              <ScrollArea className="h-60">
                {" "}
                {/* Adjust height as needed */}
                <CardContent className="p-0">
                  {userActivity?.map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-4 ${
                        index !== userActivity.length - 1
                          ? "border-b border-zinc-800"
                          : ""
                      }`}
                    >
                      <div className="mr-3 mt-1 p-2 bg-zinc-800 rounded-md text-amber-500">
                        <Activity />
                      </div>
                      <div className="flex-1">
                        <p className="text-zinc-300">{activity?.activity}</p>
                        <p className="text-zinc-500 text-sm">
                          {new Date(activity?.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
