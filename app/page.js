import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/moving-border";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  CirclePlayIcon,
  CirclePower,
  CirclePowerIcon,
} from "lucide-react";
import Link from "next/link";
import { BackgroundLines } from "@/components/ui/background-lines";
import VideoPlayer from "@/components/video-player";
import { features } from "@/data/feature";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { testimonials } from "@/data/testimonials";
import { Cover } from "@/components/ui/cover";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import { faqs } from "@/data/faqs";
import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import FooterSection from "@/components/sections/footer/default";
export default function Home() {
  return (
    <>
      <Header />
      <section className="pt-36 md:pt-48 pb-10">
        <div className="space-y-6 text-center">
          <div className="space-y-6 mx-auto">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>🎉 New feature will be added soon!!</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
            <h2 className="text-4xl lg:text-6xl md:text-5xl xl:text-7xl bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 bg-clip-text text-transparent font-extrabold gradient tracking-tighter pb-2 pr-2">
              <Cover>WeStudy</Cover> <br />
              Collaborative Learning Platform.
            </h2>
            <p className="text-center mx-auto max-w-[600px] text-muted-foreground md:text-xl px-5">
              WeStudy is a collaborative learning platform where students
              connect, share resources, and grow together.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/dashboard/overview">
              <Button className="px-8" size="lg">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard/overview">
              <Button variant="outline" size="lg" className="px-8">
                See Demo
              </Button>
            </Link>
          </div>
          <div>
            <VideoPlayer />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-5">
            Everything You Need.
          </h2>
          <p className="text-center text-muted-foreground md:text-xl px-5 mb-12">
            Powerful features to enhance your study experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary transition-colors duration-300"
                >
                  <CardContent className="pt-6 text-center flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <Badge className="mt-5">{feature.status}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl text-center font-bold tracking-tighter mb-5">
            What Our Student Says.
          </h2>
          <p className="text-center text-muted-foreground md:text-xl px-5 mb-12">
            Hear from students who have transformed their study sessions.
          </p>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto gap-6">
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-center">5K+</h3>
              <p className="text-muted-foreground text-center">Daily Users</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-center">50K+</h3>
              <p className="text-muted-foreground text-center">Total Users</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-center">65%</h3>
              <p className="text-muted-foreground text-center">
                Returning Visitors
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-center">35%</h3>
              <p className="text-muted-foreground text-center">New Visitors</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-center tracking-tighter mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => {
                return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 rounded-lg">
        <div className="contianer mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
          <h2 className="text-background text-3xl text-center font-bold tracking-tighter mb-4">
            Ready To Get Started!?
          </h2>
          <p className="text-center text-primary-foreground/80 mx-auto max-w-[600px] md:text-xl mb-5">
            Start your journey to success with WeStudy.
          </p>
          <div className="flex justify-center items-center">
            <Link href={"/dashboard/overview"} passHref>
              <Button
                variant="secondary"
                size="lg"
                className="h-11 mt-5 animate-bounce"
              >
                Strat Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
}
