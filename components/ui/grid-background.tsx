import React from "react";
import { FlipWords } from "./flip-words";
import Image from "next/image";

export function GridBackground() {

    const words = ['DSA', "Frontend", 'Consulting'];

    return (
        <div className="h-screen w-full bg-transparent bg-grid-white/[0.1] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl mx-auto px-4">
                <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left">
                    <p className="text-2xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
                        Ace your next<br /><FlipWords words={words} /> interview <br />with confidence.
                    </p>
                    <p className="mt-8 text-lg font text-neutral-400 pr-36">
                        Practice your skills the way they are meant to be practiced - in a real interview setting.
                        MeetVue is a FREE platform that provides the most popular Data Structures & Algorithms,
                        Case Study and Front-end technical questions asked in an Interview.
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <Image src={"/images/meet-vue.PNG"} width={600} height={600} alt="meet-vue" className="rounded-xl " />
                </div>
            </div>
        </div>
    );
}
