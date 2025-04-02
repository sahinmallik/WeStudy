"use client";

import React, { useEffect } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Book, Loader2, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { getSubjects } from "@/action/getSubjects";
import useFetch from "@/hooks/createSubject";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SubjectsPage = () => {
  // Sample subjects data
  const pathName = usePathname();

  const {
    loading: updateLoading,
    fn: getGroupsFn,
    data: userDetails,
  } = useFetch(getSubjects);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        await getGroupsFn();
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, [pathName]);
  console.log(userDetails);

  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-2">
        <Link href="/dashboard/overview">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">My Subjects</h1>
        <p className="text-zinc-400">
          Currently You are in {userDetails?.groups?.length} subjects. Keep up
          the good work!
        </p>
      </div>

      {/* Subjects Grid */}
      {updateLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin h-10 w-10 text-zinc-100" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {userDetails?.groups?.map((group, index) => (
            <Link href={`/dashboard/group/${group.id}`} key={index}>
              <Card
                key={index}
                className="bg-zinc-900 border-zinc-800 hover:border-amber-700 transition-all cursor-pointer group overflow-hidden"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2 bg-amber-950 text-amber-400 hover:bg-amber-900">
                        {group?.group.tag}
                      </Badge>
                      <CardTitle className="text-zinc-100">
                        {group?.group.groupName}
                      </CardTitle>
                    </div>
                    <div className="bg-zinc-800 rounded-full h-12 w-12 flex items-center justify-center group-hover:bg-amber-900 transition-colors">
                      <Book className="h-6 w-6 text-amber-400" />
                    </div>
                  </div>
                </CardHeader>

                <CardFooter className="border-t border-zinc-800 bg-zinc-800/30 px-6 py-3">
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-zinc-500" />
                      <span className="text-zinc-400 text-sm">
                        {group?.group?.userCount} students
                      </span>
                    </div>

                    {/* <div className="flex -space-x-2">
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
                  </div> */}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;
