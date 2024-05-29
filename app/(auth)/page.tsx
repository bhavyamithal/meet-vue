"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import HeroSection from '@/components/HeroSection';
import { GridBackground } from '@/components/ui/grid-background';

const LandingPage = () => {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push('/home');
        }
    }, [isLoaded, isSignedIn, router]);

    return (
        <div className='overflow-hidden'>
            <GridBackground />
            <HeroSection
                heading='Tailored Interview Questions'
                subHeading='Upload your job description and resume to receive custom interview questions tailored to your work experience.'
                imageUrl='/images/meet-vue.PNG'
                position='bottom'
                ctaText='Get Started'
                ctaLink='/get-started'
            />
            <HeroSection
                heading='Practice Makes Perfect'
                subHeading='Improve your interview skills with unlimited practice questions generated from your job applications.'
                imageUrl='/images/meet-vue.PNG'
                position='right'
                ctaText='Learn More'
                ctaLink='/learn-more'
            />
            <HeroSection
                heading='Ace Your Interviews'
                subHeading='With our custom questions, you can feel confident and prepared for any interview.'
                imageUrl='/images/meet-vue.PNG'
                position='left'
                ctaText='Sign Up Now'
                ctaLink='/sign-up'
            />
        </div>
    );
}

export default LandingPage;
