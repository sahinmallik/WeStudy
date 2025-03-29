"use client";

import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const SubjectDetailPage = ({ params }) => {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const {
    data: subjects,
    loading: subjectsLoading,
    fn: getSubjectsByIdFn,
  } = useFetch(getSubjectsById);

  useEffect(() => {
    const fetchSubjectById = async () => {
      try {
        if (id) {
          await getSubjectsByIdFn(id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjectById();
  }, [id]);
  console.log(id);
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

  return (
    <div
      className="p-3 sm:p-4 md:p-6 bg-zinc-950 text-zinc-100"
      style={{ minHeight: "100%" }}
    >
      {/* Header with back button */}
      {subjectsLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin h-10 w-10" />
        </div>
      ) : (
        <>
          <div className="flex items-center mb-2">
            <Link href="/dashboard/subjects">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-zinc-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Subjects
              </Button>
            </Link>
          </div>

          {/* Subject Title and Add Student button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                  {subjects?.subjectName}
                </h1>
                <Badge className="bg-amber-800 text-amber-200">
                  {subjects?.code}
                </Badge>
              </div>
            </div>
            <Button
              onClick={() => setActiveTab("addStudent")}
              className="bg-amber-600 hover:bg-amber-700 text-zinc-950 w-full sm:w-auto"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b border-zinc-800 mb-2">
              <TabsList className="relative w-full flex overflow-x-auto scrollbar-hide py-2 px-0 bg-transparent">
                <TabsTrigger
                  value="overview"
                  className="flex-shrink-0 px-4 py-3 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="flex-shrink-0 px-4 py-3 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Students
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="flex-shrink-0 px-4 py-3 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="flex-shrink-0 px-4 py-3 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Upload
                </TabsTrigger>
                <TabsTrigger
                  value="addStudent"
                  className="flex-shrink-0 px-4 py-3 text-sm rounded-md data-[state=active]:bg-amber-600 data-[state=active]:text-zinc-950"
                >
                  Add Student
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
                        <code>{subject.meetingLink}</code>
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
                            {subjects?.emails.length}
                          </p>
                          <p className="text-zinc-400 text-sm">Students</p>
                        </div>
                        <div className="bg-zinc-800 p-4 rounded-md text-center">
                          <p className="text-3xl font-bold text-amber-500">
                            {subjects?.documents.length}
                          </p>
                          <p className="text-zinc-400 text-sm">Documents</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Students Tab Content */}
            <TabsContent value="students" className="pt-2">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                    <CardTitle className="text-zinc-100">
                      Enrolled Students ({subjects?.emails.length})
                    </CardTitle>
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <Input
                        placeholder="Search students..."
                        className="bg-zinc-800 border-zinc-700 pl-10 w-full sm:w-64 text-zinc-300"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subject.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center p-3 bg-zinc-800 rounded-md"
                      >
                        <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                          <AvatarFallback className="bg-amber-900 text-amber-100">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-200 font-medium truncate">
                            {student.name}
                          </p>
                          <p className="text-zinc-400 text-sm truncate">
                            {student.email}
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

            {/* Add Student Tab Content */}
            <TabsContent value="addStudent" className="pt-2">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">
                    Add Student to {subject.code}
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Add new students to the course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    <div className="grid w-full gap-2">
                      <Label htmlFor="student-email" className="text-zinc-300">
                        Student Email
                      </Label>
                      <Input
                        id="student-email"
                        placeholder="Enter student email address"
                        className="bg-zinc-800 border-zinc-700 text-zinc-300"
                      />
                      <p className="text-zinc-500 text-xs mt-1">
                        The student must have a valid weStudy account
                      </p>
                    </div>

                    <Button className="bg-amber-600 hover:bg-amber-700 text-zinc-950">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Student
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
