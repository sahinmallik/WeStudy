"use client";

import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Video,
  FileText,
  Link2,
  Download,
  Upload,
  Users,
  UserPlus,
  File,
  Search,
  Loader2,
  Menu,
  ChevronDown,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSubjectsById } from "@/action/getSubjectById";
import useFetch from "@/hooks/createSubject";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getGroupRecentActivity } from "@/action/getGroupRecentActivity";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GroupAddSchema } from "@/app/lib/groupAddSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserToGroup } from "@/action/addUserToGroup";
import { toast } from "sonner";

const SubjectDetailPage = ({ params }) => {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const {
    data: group,
    loading: groupLoading,
    fn: getgroupByIdFn,
  } = useFetch(getSubjectsById);

  const {
    data: groupActivity,
    loading: groupActivityLoading,
    fn: getGroupActivityFn,
  } = useFetch(getGroupRecentActivity);

  const {
    data: addingUserData,
    loading: addingUserLoading,
    fn: addUserToGroupFn,
  } = useFetch(addUserToGroup);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // New state for modal

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        await Promise.all([getgroupByIdFn(id), getGroupActivityFn(id)]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Add reset function
    watch,
  } = useForm({
    resolver: zodResolver(GroupAddSchema),
  });

  const onSubmit = async (values) => {
    try {
      await addUserToGroupFn(id, values);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    if (addingUserData?.success && !addingUserLoading) {
      getgroupByIdFn(id);
      getGroupActivityFn(id);
      setValue("email", "");
      setIsAddUserModalOpen(false);
      reset();
      toast.success(addingUserData?.message || "User added successfully.");
    } else if (
      addingUserData &&
      !addingUserData?.success &&
      !addingUserLoading
    ) {
      toast.error(addingUserData?.message || "Failed to add user.");
    }
  }, [addingUserData, addingUserLoading]);

  // Sample subject data
  const subject = {
    code: "ADBS",
    name: "Advanced Database Systems",
    instructor: "Dr. Michael Chen",
    description:
      "This course covers advanced topics in database management systems including database design, transaction processing, concurrency control, and distributed databases.",
    meetingLink: "https://westudy.meet/adbs-2025-spring",
    students: [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@westudy.edu",
        avatar: "JS",
      },
      { id: 2, name: "Emma Wilson", email: "emma.w@westudy.edu", avatar: "EW" },
      { id: 3, name: "Ryan Kim", email: "ryan.kim@westudy.edu", avatar: "RK" },
      {
        id: 4,
        name: "Aisha Patel",
        email: "a.patel@westudy.edu",
        avatar: "AP",
      },
      {
        id: 5,
        name: "Michael Brown",
        email: "m.brown@westudy.edu",
        avatar: "MB",
      },
      {
        id: 6,
        name: "Sofia Garcia",
        email: "s.garcia@westudy.edu",
        avatar: "SG",
      },
      { id: 7, name: "David Lee", email: "d.lee@westudy.edu", avatar: "DL" },
      {
        id: 8,
        name: "Olivia Turner",
        email: "o.turner@westudy.edu",
        avatar: "OT",
      },
    ],
    documents: [
      {
        id: 1,
        name: "Course Syllabus.pdf",
        size: "0.5 MB",
        uploadedBy: "Dr. Michael Chen",
        date: "Mar 15, 2025",
      },
      {
        id: 2,
        name: "Lecture 1 - Introduction to ADBS.pptx",
        size: "2.3 MB",
        uploadedBy: "Dr. Michael Chen",
        date: "Mar 17, 2025",
      },
      {
        id: 3,
        name: "Lecture 2 - Database Design.pdf",
        size: "1.8 MB",
        uploadedBy: "Dr. Michael Chen",
        date: "Mar 19, 2025",
      },
      {
        id: 4,
        name: "Assignment 1 - ER Diagrams.docx",
        size: "0.7 MB",
        uploadedBy: "Dr. Michael Chen",
        date: "Mar 20, 2025",
      },
      {
        id: 5,
        name: "Lab 1 - SQL Advanced Queries.pdf",
        size: "1.1 MB",
        uploadedBy: "Dr. Michael Chen",
        date: "Mar 22, 2025",
      },
    ],
    upcomingEvents: [
      {
        name: "Lecture: Transaction Processing",
        date: "Apr 2, 2025",
        time: "10:00 AM - 11:30 AM",
      },
      { name: "Assignment 2 Due", date: "Apr 5, 2025", time: "11:59 PM" },
      {
        name: "Lab Session: Indexing",
        date: "Apr 7, 2025",
        time: "2:00 PM - 4:00 PM",
      },
    ],
  };

  // Function to handle tab change from dropdown
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Get the current tab name for display
  const getCurrentTabName = () => {
    switch (activeTab) {
      case "overview":
        return "Overview";
      case "users":
        return "Users";
      case "documents":
        return "Documents";
      case "upload":
        return "Upload";
      default:
        return "Overview";
    }
  };

  return (
    <div
      className="p-3 sm:p-4 md:p-6 bg-zinc-950 text-zinc-100"
      style={{ minHeight: "100%" }}
    >
      {/* Header with back button */}
      {groupLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin h-10 w-10" />
        </div>
      ) : (
        <>
          <div className="flex items-center mb-2">
            <Link href="/dashboard/groups">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-zinc-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Groups
              </Button>
            </Link>
          </div>

          {/* Subject Title and Add Student button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                  {group?.groupName}
                </h1>
                <Badge className="bg-amber-800 text-amber-200">
                  {group?.tag}
                </Badge>
                <Badge className="bg-amber-800 text-amber-200">
                  {group?.specialization}
                </Badge>
              </div>
            </div>
            <Dialog
              open={isAddUserModalOpen}
              onOpenChange={setIsAddUserModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700 text-zinc-950 w-full sm:w-auto">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add User</DialogTitle>
                  <DialogDescription>
                    The student must have a valid weStudy account.
                  </DialogDescription>
                </DialogHeader>
                {/* Form starts here */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-2 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      className="col-span-3"
                      {...register("email")}
                      type="email"
                      placeholder="Enter the email..."
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                  {/* Submit button inside form */}
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      Add User
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Mobile Tab Menu */}
            <div className="md:hidden mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-zinc-800 border-zinc-700 text-zinc-100"
                  >
                    <div className="flex items-center">
                      <Menu className="h-4 w-4 mr-2" />
                      {getCurrentTabName()}
                    </div>
                    <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[200px] bg-zinc-800 border-zinc-700 text-zinc-100">
                  <DropdownMenuItem
                    className={`${
                      activeTab === "overview"
                        ? "bg-amber-600 text-zinc-950"
                        : ""
                    }`}
                    onClick={() => handleTabChange("overview")}
                  >
                    Overview
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`${
                      activeTab === "users" ? "bg-amber-600 text-zinc-950" : ""
                    }`}
                    onClick={() => handleTabChange("users")}
                  >
                    Users
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`${
                      activeTab === "documents"
                        ? "bg-amber-600 text-zinc-950"
                        : ""
                    }`}
                    onClick={() => handleTabChange("documents")}
                  >
                    Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`${
                      activeTab === "upload" ? "bg-amber-600 text-zinc-950" : ""
                    }`}
                    onClick={() => handleTabChange("upload")}
                  >
                    Upload
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Tabs - Hidden on Mobile */}
            <div className="hidden md:block border-b border-zinc-800 mb-2">
              <TabsList className="relative w-full flex py-2 px-0 bg-transparent">
                <TabsTrigger
                  value="overview"
                  className="flex-shrink-0 p-4 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="flex-shrink-0 p-4 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="flex-shrink-0 p-4 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="flex-shrink-0 p-4 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Upload
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-zinc-100">
                        Video Conference
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-zinc-800 p-3 rounded-md font-mono text-sm text-zinc-300 overflow-x-auto">
                        <code>{group?.videoUrl}</code>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700 text-zinc-950">
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-zinc-100">
                        Course Documents
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-500 hover:text-amber-400"
                        onClick={() => setActiveTab("documents")}
                      >
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {subject.documents.slice(0, 3).map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between py-2 border-b border-zinc-800"
                          >
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-3 text-zinc-500" />
                              <div>
                                <p className="text-zinc-300">{doc.name}</p>
                                <p className="text-zinc-500 text-xs">
                                  {doc.size} • {doc.date}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-zinc-400 hover:text-zinc-100"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-zinc-100">
                        Class Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-800 p-4 rounded-md text-center">
                          <p className="text-3xl font-bold text-amber-500">
                            {group?.userCount}
                          </p>
                          <p className="text-zinc-400 text-sm">Students</p>
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-md text-center">
                          <p className="text-3xl font-bold text-amber-500">
                            {group?.documents.length}
                          </p>
                          <p className="text-zinc-400 text-sm">Documents</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4 mt-4">
                  <h2 className="text-xl font-bold text-zinc-200">
                    Recent Activity
                  </h2>
                  {/* <Button
              variant="ghost"
              className="text-amber-500 hover:text-amber-400 hover:bg-zinc-900"
            >
              See All
            </Button> */}
                </div>

                {groupActivityLoading ? (
                  <div className="flex justify-center items-center">
                    <Loader2 className="animate-spin h-10 w-10 text-zinc-100" />
                  </div>
                ) : (
                  <Card className="bg-zinc-900 border-zinc-800">
                    <ScrollArea className="h-40">
                      {" "}
                      {/* Adjust height as needed */}
                      <CardContent className="p-0">
                        {groupActivity?.map((activity, index) => (
                          <div
                            key={index}
                            className={`flex items-start p-4 ${
                              index !== groupActivity.length - 1
                                ? "border-b border-zinc-800"
                                : ""
                            }`}
                          >
                            <div className="mr-3 mt-1 p-2 bg-zinc-800 rounded-md text-amber-500">
                              <Activity />
                            </div>
                            <div className="flex-1">
                              <p className="text-zinc-300">
                                {activity?.activity}
                              </p>
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
            </TabsContent>

            {/* Students Tab Content */}
            <TabsContent value="users" className="pt-2">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                    <CardTitle className="text-zinc-60">
                      {/* Enrolled Students ({subjects?.emails.length}) */}
                    </CardTitle>
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <Input
                        placeholder="Search users..."
                        className="bg-zinc-800 border-zinc-700 pl-10 w-full sm:w-64 text-zinc-300"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group?.users.map((user) => (
                      <div
                        key={user.user.id}
                        className="flex items-center p-3 bg-zinc-800 rounded-md"
                      >
                        <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                          <AvatarFallback className="bg-amber-900 text-amber-100">
                            <Image
                              src={user.user.imageUrl}
                              alt={user.user.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-200 font-medium truncate">
                            {user.user.name}
                          </p>
                          <p className="text-zinc-400 text-sm truncate">
                            {user.user.email}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-zinc-400 hover:text-zinc-100 flex-shrink-0"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab Content */}
            <TabsContent value="documents" className="pt-2">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                    <CardTitle className="text-zinc-100">
                      Course Documents ({subject.documents.length})
                    </CardTitle>
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <Input
                        placeholder="Search documents..."
                        className="bg-zinc-800 border-zinc-700 pl-10 w-full sm:w-64 text-zinc-300"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table className="w-full min-w-[600px]">
                      <TableHeader>
                        <TableRow className="bg-zinc-800">
                          <TableHead className="text-left p-3 text-zinc-400 font-medium">
                            Document Name
                          </TableHead>
                          <TableHead className="text-left p-3 text-zinc-400 font-medium hidden sm:table-cell">
                            Size
                          </TableHead>
                          <TableHead className="text-left p-3 text-zinc-400 font-medium hidden md:table-cell">
                            Uploaded By
                          </TableHead>
                          <TableHead className="text-left p-3 text-zinc-400 font-medium hidden sm:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-left p-3 text-zinc-400 font-medium">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subject.documents.map((doc) => (
                          <TableRow
                            key={doc.id}
                            className="border-t border-zinc-800 hover:bg-zinc-800/50"
                          >
                            <TableCell className="p-3">
                              <div className="flex items-center">
                                <File className="h-4 w-4 mr-2 text-zinc-500" />
                                <span className="text-zinc-300 truncate max-w-[150px] sm:max-w-none">
                                  {doc.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="p-3 text-zinc-400 hidden sm:table-cell">
                              {doc.size}
                            </TableCell>
                            <TableCell className="p-3 text-zinc-400 hidden md:table-cell">
                              {doc.uploadedBy}
                            </TableCell>
                            <TableCell className="p-3 text-zinc-400 hidden sm:table-cell">
                              {doc.date}
                            </TableCell>
                            <TableCell className="p-3">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-zinc-400 h-8 w-8 p-0"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-zinc-400 h-8 w-8 p-0"
                                >
                                  <Link2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Upload Tab Content */}
            <TabsContent value="upload" className="pt-2">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">
                    Upload Document
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Upload new documents for the course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    <div className="grid w-full gap-2">
                      <Label htmlFor="document-title" className="text-zinc-300">
                        Document Title
                      </Label>
                      <Input
                        id="document-title"
                        placeholder="Enter document title"
                        className="bg-zinc-800 border-zinc-700 text-zinc-300"
                      />
                    </div>

                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg">
                      <FileUpload />
                    </div>

                    <Button className="bg-amber-600 hover:bg-amber-700 text-zinc-950 w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default SubjectDetailPage;
