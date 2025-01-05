'use client'
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent
} from "@/components/ui/card"
import Image from "next/image"

// Create a separate component for the card content
function AboutMeCard() {
    return (
        <Card className="w-3/4 max-w-[800px] p-6">
            <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="/skills.jpg"
                        alt="I got mad skills"
                        
                        width={300}
                        height={300}
                    />

                </div>
            </CardHeader>

            <CardContent className="grid gap-6">
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Skills</p>
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
    return (
        <div>
            {/* Main content */}
            <div className="flex items-center justify-center min-h-screen px-4 py-16">
                <AboutMeCard />
            </div>
        </div>
    )
}