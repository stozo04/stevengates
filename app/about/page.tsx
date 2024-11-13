'use client'
import { Check, Sun, Moon } from "lucide-react" // Assuming these icons are used for light and dark mode toggle
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react" // For dark mode toggle state

type CardProps = React.ComponentProps<typeof Card>

export default function Page({ className, ...props }: CardProps) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark", !isDarkMode) // Toggles dark mode at the root level
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen px-4"> {/* Centering wrapper */}
            {/* Back to Home Button in top-left corner */}
            <Link href="/" passHref>
                <Button variant="outline" className="absolute top-4 left-4">
                    ← Back to Home
                </Button>
            </Link>

            {/* Toggle Mode Button in top-right corner */}
            <Button
                onClick={toggleMode}
                variant="outline"
                className="absolute top-4 right-4 flex items-center space-x-2"
            >
                {isDarkMode ? <Sun /> : <Moon />}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </Button>

            <Card className={cn("w-3/4 max-w-[800px] p-6", className)} {...props}>
                <CardHeader>
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src="/assets/me.jpg"
                            alt="Steven's profile picture"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <CardTitle className="text-center">About Me</CardTitle>
                        <CardDescription className="text-center">
                            Hey there! I'm Steven—an unashamed tech geek, a dad who's endlessly fascinated by life's little milestones, AI enthusiast, and a writer with a penchant for dreaming big about the future while treasuring the magic of the past.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="grid gap-6">
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">My Journey</p>
                        <p className="text-sm text-muted-foreground">
                            From AI dreams to published books, my journey has been fueled by curiosity and creativity. From a young age, I've been captivated by the wonders of technology, especially AI and robotics. Today, that passion has only deepened, fueling projects that blend tech and creativity. Whether I'm tinkering with new tech, thinking up ways AI can make life easier, or plotting out creative projects, I’m always driven by the potential of what’s to come.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">Passions & Projects</p>
                        <p className="text-sm text-muted-foreground">
                            If there’s one thing I love as much as technology, it’s storytelling. Recently, I finished my first novel (think Nicholas Sparks vibes!)—and I couldn’t be more excited. I’m also cooking up a few side projects, like a blog to document my daughter Mila’s milestones and exploring ways to leverage the power of AI.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">Family & Personal Life</p>
                        <p className="text-sm text-muted-foreground">
                            I grew up in Houston, attended Texas Tech University, and now call Dallas, TX home. I’m lucky to share life with my beautiful wife, Katerina. Our family wouldn’t be complete without Volk, our spirited half-German Shepherd, half-Husky dog, and Kessa, our regal tuxedo cat who rules the house.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            And then, there's Mila, my daughter and my greatest inspiration. From watching her smile at her reflection to seeing her explore the world at the park, every moment with her reminds me of the beauty in everyday life. She’s the heartbeat behind so many of my projects and dreams.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">A Few Fun Facts</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            <li>Tesla fan (*I'm all in for futuristic cars!*).</li>
                            <li>Lover of 90s nostalgia (*Give me a throwback song, and I'm dancing like it’s 1999!*).</li>
                            <li>Calisthenics enthusiast (*There's no better way to test limits!*).</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg font-semibold">Favorite Things</p>
                        <p className="text-sm text-muted-foreground">
                            My all-time favorite movie is <em>Parallels</em>, and I never tire of 90s music. It’s all about the classics!
                        </p>
                    </div>
                </CardContent>

                <CardFooter>
                    <a href="https://x.com/sgates2011" target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button className="w-full">
                            <Check /> Let’s Connect
                        </Button>
                    </a>
                </CardFooter>
            </Card>
        </div>
    )
}
