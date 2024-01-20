import ProfileForm from "@/components/ProfileForm";
import Screenings from "@/components/Screenings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Screening = {
    severity: number;
    date: string;
    id: number;
};
const SCREENINGS: Screening[] = [
    {
        severity: 88,
        date: "01/06/2005",
        id: 1,
    },
    {
        severity: 10,
        date: "01/05/2005",
        id: 2,
    },
    {
        severity: 2,
        date: "02/06/2004",
        id: 3,
    },
    {
        severity: 3,
        date: "07/15/2012",
        id: 4,
    },
    {
        severity: 0,
        date: "03/06/2005",
        id: 5,
    },
];

const Page = () => {
    return (
        <div className="ml-32 flex justify-center min-h-[calc(100vh-6rem)] space-x-48">
            <div className="flex flex-col w-full h-full mt-16">
                <div className="flex-between w-full mb-16">
                    <h1 className="text-5xl font-bold">Your Screenings</h1>

                    <Button className="text-lg p-5">Export All</Button>
                </div>

                <Screenings screenings={SCREENINGS} />
            </div>

            <Card className="min-w-[500px] h-[100vh] rounded-none">
                <CardHeader className="flex-center flex-col gap-y-4 text-4xl mt-16">
                    <Avatar className="w-48 h-48">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>M</AvatarFallback>
                    </Avatar>

                    <CardTitle className="text-4xl">Jane D.</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent className="w-[400px] mx-auto">
                    <ProfileForm />
                </CardContent>

                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>
    );
};

export default Page;
