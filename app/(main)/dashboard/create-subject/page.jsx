"use client";
import { Book, Box, Loader2 } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subjectSchema } from "@/app/lib/schema";
import { createSubject } from "@/action/subject";
import useFetch from "@/hooks/createSubject";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function GlowingFormCard() {
  const router = useRouter();
  const {
    loading: updateLoading,
    fn: createSubjectFn,
    data: updateResult,
  } = useFetch(createSubject);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit = async (values) => {
    try {
      await createSubjectFn(values);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Subject created successfully");
      router.replace("/dashboard/subjects"); // Replaces the current page in history
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  return (
    <div
      className="flex justify-center items-center py-10"
      style={{ height: "100%" }}
    >
      <div className="flex justify-center items-center w-full max-w-md">
        <GridItem
          area=""
          icon={<Book className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Enter Your Subject Name"
          description={
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div>
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  type="text"
                  {...register("code")}
                  placeholder="Enter your subject Code"
                  className="mt-2"
                />
                {errors.subjectName && (
                  <p className="text-red-500">{errors.code.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Enter your subject name"
                  className="mt-2"
                />
                {errors.subjectName && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
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
