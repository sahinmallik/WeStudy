"use client";
import {
  Book,
  Box,
  Check,
  ChevronsUpDown,
  Loader2,
  User,
  Users,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupSchema } from "@/app/lib/schema";
import useFetch from "@/hooks/createSubject";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { createGroup } from "@/action/createGroup";

const subjects = [
  { value: "ANN" },
  { value: "ML" },
  { value: "DL" },
  { value: "CV" },
  { value: "NLP" },
  { value: "DS" },
  { value: "ALGO" },
  { value: "DBMS" },
  { value: "OS" },
  { value: "CN" },
  { value: "SE" },
  { value: "AI" },
  { value: "IOT" },
  { value: "CYBERSEC" },
  { value: "CLOUD" },
  { value: "BLOCKCHAIN" },
  { value: "HCI" },
];
const specializations = [
  { value: "RESEARCH" },
  { value: "STUDY" },
  { value: "DEVELOPMENT" },
  { value: "DESIGN" },
  { value: "TESTING" },
  { value: "IMPLEMENTATION" },
  { value: "ANALYSIS" },
  { value: "MODELING" },
  { value: "SIMULATION" },
  { value: "OPTIMIZATION" },
  { value: "SECURITY" },
  { value: "INNOVATION" },
  { value: "CONSULTING" },
  { value: "TRAINING" },
  { value: "DEPLOYMENT" },
];

export default function GlowingFormCard() {
  const router = useRouter();
  const {
    loading: updateLoading,
    fn: createGroupFn,
    data: updateResult,
  } = useFetch(createGroup);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(GroupSchema),
  });

  const onSubmit = async (values) => {
    try {
      await createGroupFn(values);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.replace("/dashboard/groups"); // Replaces the current page in history
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const [openSubject, setOpenSubject] = useState(false);
  const [openSpecialization, setOpenSpecialization] = useState(false);
  const [subjectValues, setSubjectValues] = useState("");
  const [specializationValues, setSpecializationValues] = useState("");
  return (
    <div
      className="flex justify-center items-center py-10"
      style={{ height: "100%" }}
    >
      <div className="flex justify-center items-center w-full max-w-md">
        <GridItem
          area=""
          icon={<Users className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Enter Your Group Name"
          description={
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div>
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Enter your group name"
                  className="mt-2"
                />
                {errors.subjectName && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="name">Subject Tag</Label>
                <Popover open={openSubject} onOpenChange={setOpenSubject}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSubject}
                      className="w-full justify-between mt-2"
                    >
                      {subjectValues
                        ? subjects.find(
                            (subject) => subject.value === subjectValues
                          )?.value
                        : "Select Subject Tag..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search subject tag..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No subject found.</CommandEmpty>
                        <CommandGroup>
                          {subjects.map((subject) => (
                            <CommandItem
                              key={subject.value}
                              value={subject.value}
                              onSelect={(currentValue) => {
                                setSubjectValues(
                                  currentValue === subjectValues
                                    ? ""
                                    : currentValue
                                );
                                setValue(
                                  "subjectTag",
                                  currentValue === subjectValues
                                    ? ""
                                    : currentValue
                                );
                                setOpenSubject(false);
                              }}
                            >
                              {subject.value}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  subjectValues === subject.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="name">Specialization</Label>
                <Popover
                  open={openSpecialization}
                  onOpenChange={setOpenSpecialization}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSpecialization}
                      className="w-full justify-between mt-2"
                    >
                      {specializationValues
                        ? specializations.find(
                            (specialization) =>
                              specialization.value === specializationValues
                          )?.value
                        : "Select Specialization..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search specialization..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No specialization found.</CommandEmpty>
                        <CommandGroup>
                          {specializations.map((specialization) => (
                            <CommandItem
                              key={specialization.value}
                              value={specialization.value}
                              onSelect={(currentValue) => {
                                setSpecializationValues(
                                  currentValue === specializationValues
                                    ? ""
                                    : currentValue
                                );
                                setValue(
                                  "specialization",
                                  currentValue === specializationValues
                                    ? ""
                                    : currentValue
                                );

                                setOpenSpecialization(false);
                              }}
                            >
                              {specialization.value}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  specializationValues === specialization.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" disabled={updateLoading}>
                {updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          }
        />
      </div>
    </div>
  );
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full  border p-4 rounded-3xl md:p-5">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl border-0.75 p-8 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-8">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-lg border border-gray-600 p-3">
              {icon}
            </div>
            <div className="space-y-4">
              <h3 className="pt-1 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <div className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-black dark:text-neutral-400">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
