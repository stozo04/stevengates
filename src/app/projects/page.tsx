'use client'
import {
    Card,
    CardHeader,
    CardFooter,
    // CardTitle,
    // CardDescription,
    CardContent
} from "@/components/ui/card"
import NavBar from "@/components/navbar/NavBar"
const PROJECTS = [
    {name: "Mila Gates", url: "www.milagates.com", techStack: ["TODO", "TODO"]},
    {name: "Linq To Typescript", url: "www.linqtotypescript.com", techStack: ["TODO", "TODO"]}
]

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
                    <p className="text-lg font-semibold">Project One</p>
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
            {/* Nav Bar */}
            <NavBar />

            {/* Main content */}
            <div className="flex items-center justify-around min-h-screen px-4 py-16">
                {
                    PROJECTS.map((p, i)=> (<div className="border border-grey-300 p-4 rounded-l shadow-md" key={i}> { p.name }</div>))
                }
            </div>
        </div>
    )
}