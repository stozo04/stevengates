'use client'
import {
    Card,
    CardHeader,
    CardFooter,
    // CardTitle,
    // CardDescription,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import Image from "next/image"
import { 
    // Check, 
    Sun, 
    Moon 
} from "lucide-react"
import { useState, useEffect } from "react"

// Create a separate component for the card content
function AboutMeCard() {
    return (
        <Card className="w-3/4 max-w-[800px] p-6">
            <CardHeader>
                {/* <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="/me.jpg"
                        alt="Steven's profile picture"
                        className="w-24 h-24 rounded-full object-cover"
                        width={96}
                        height={96}
                    />
                    <CardTitle className="text-center">About Me</CardTitle>
                    <CardDescription className="text-center whitespace-normal">
                       Projects
                    </CardDescription>
                </div> */}
            </CardHeader>

            <CardContent className="grid gap-6">
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Blog</p>
                    <p className="text-sm text-muted-foreground">
                        TODO
                    </p>
                </div>
               
            </CardContent>

            <CardFooter>
                {/* <a href="https://x.com/sgates2011" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Let&apos;s Connect
                    </Button>
                </a> */}
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
                        ← Home
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