"use client"

import * as React from "react"
import Link from "next/link"
import { useUser, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import NavButton from "./NavButton"
import { VideoIcon } from "lucide-react"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function LandingNavBar() {
    const { user } = useUser();

    return (
        <NavigationMenu className=" text-white px-4 md:px-6 py-1">
            <NavigationMenuList className="flex items-center justify-between">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:bg-slate-700 transition-all rounded-full">Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gray-800 bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            MeetVue
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            AI-powered mock interviews. Practice with your peers. Invite them with a link.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/" title="Introduction">
                                Choose from a range of different topics like DSA & many more!
                            </ListItem>
                            <ListItem href="/sign-in" title="Sign In">
                                Sign In to give mock interviews with your peers.
                            </ListItem>
                            <ListItem href="/sign-up" title="Sign Up">
                                Join us and give your career the best shot!
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:bg-slate-700 transition-all rounded-full">Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <SignedOut>
                    <NavigationMenuItem className="hover:bg-slate-700 transition-all rounded-full">
                        <Link href="/sign-in" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                SignIn
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hover:bg-slate-700 transition-all rounded-full">
                        <Link href="/sign-up" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                SignUp
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </SignedOut>
                <SignedIn>
                    <NavigationMenuItem className="hover:bg-slate-700 transition-all rounded-full">
                        <UserButton afterSignOutUrl="/" />
                    </NavigationMenuItem>
                    
                </SignedIn>
                <NavigationMenuItem>
                    <Link href="https://github.com/bhavyamithal/meet-vue" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <NavButton title="GitHub" />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-teal-700 hover:text-white focus:bg-teal-700 focus:text-white",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
