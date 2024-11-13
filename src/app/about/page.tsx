'use client'
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Check, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

// Create a separate component for the card content
function AboutMeCard() {
    return (
        <Card className="w-3/4 max-w-[800px] p-6">
            <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="/me.jpg"
                        alt="Steven's profile picture"
                        className="w-24 h-24 rounded-full object-cover"
                        width={96}
                        height={96}
                    />
                    <CardTitle className="text-center">About Me</CardTitle>
                    <CardDescription className="text-center whitespace-normal">
                        Hey there! I&apos;m Steven—an unashamed tech geek, a dad who&apos;s endlessly fascinated by life&apos;s little milestones, AI enthusiast, and a writer with a penchant for dreaming big about the future while treasuring the magic of the past.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="grid gap-6">
                <div className="space-y-2">
                    <p className="text-lg font-semibold">My Journey</p>
                    <p className="text-sm text-muted-foreground">
                        From AI dreams to published books, my journey has been fueled by curiosity and creativity. From a young age, I&apos;ve been captivated by the wonders of technology, especially AI and robotics. Today, that passion has only deepened, fueling projects that blend tech and creativity. Whether I&apos;m tinkering with new tech, thinking up ways AI can make life easier, or plotting out creative projects, I&apos;m always driven by the potential of what&apos;s to come.
                    </p>
                </div>
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Passions & Projects</p>
                    <p className="text-sm text-muted-foreground">
                        If there&apos;s one thing I love as much as technology, it&apos;s storytelling. Recently, I finished my first novel (think Nicholas Sparks vibes!)—and I couldn&apos;t be more excited. I&apos;m also cooking up a few side projects, like a blog to document my daughter Mila&apos;s milestones and exploring ways to leverage the power of AI.
                    </p>
                </div>
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Family & Personal Life</p>
                    <p className="text-sm text-muted-foreground">
                        I grew up in Houston, attended Texas Tech University, and now call Dallas, TX home. I&apos;m lucky to share life with my beautiful wife, Katerina. Our family wouldn&apos;t be complete without Volk, our spirited half-German Shepherd, half-Husky dog, and Kessa, our regal tuxedo cat who rules the house.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        And then, there&apos;s Mila, my daughter and my greatest inspiration. From watching her smile at her reflection to seeing her explore the world at the park, every moment with her reminds me of the beauty in everyday life. She&apos;s the heartbeat behind so many of my projects and dreams.
                    </p>
                </div>
                <div className="space-y-2">
                    <p className="text-lg font-semibold">A Few Fun Facts</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Tesla fan (*I&apos;m all in for futuristic cars!*).</li>
                        <li>Lover of 90s nostalgia (*Give me a throwback song, and I&apos;m dancing like it&apos;s 1999!*).</li>
                        <li>Calisthenics enthusiast (*There&apos;s no better way to test limits!*).</li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Favorite Things</p>
                    <p className="text-sm text-muted-foreground">
                        My all-time favorite movie is <em>Parallels</em>, and I never tire of 90s music. It&apos;s all about the classics!
                    </p>
                </div>
            </CardContent>

            <CardFooter>
                <a href="https://x.com/sgates2011" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Let&apos;s Connect
                    </Button>
                </a>
            </CardFooter>
        </Card>
    )
}

// Main page component
export default function Page() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        // Check initial dark mode preference
        const isDark = document.documentElement.classList.contains('dark')
        setIsDarkMode(isDark)

        // Optional: Check system preference
        const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
        if (!isDark && darkModePreference.matches) {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <div>
            {/* Navigation buttons */}
            <div className="fixed top-4 left-4 z-10">
                <Link href="/" passHref>
                    <Button variant="outline">
                        ← Back to Home
                    </Button>
                </Link>
            </div>

            <div className="fixed top-4 right-4 z-10">
                <Button
                    onClick={toggleMode}
                    variant="outline"
                    className="flex items-center space-x-2"
                >
                    {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                    <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </Button>
            </div>

            {/* Main content */}
            <div className="flex items-center justify-center min-h-screen px-4 py-16">
                <AboutMeCard />
            </div>
        </div>
    )
}