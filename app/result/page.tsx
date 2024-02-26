import React from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const result = () => {
    // axios.get('')
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    return (
        <div className='container m-auto mt-8'>
            <h1 className='text-xl font-bold'>4 Resumes Filtered</h1>
            <h1 className='text-xs'>Purpose Section</h1>
            <Separator className="my-4" />
            <div className='grid grid-col-3 grid-flow-col'>
                <div className='row-span-1'>
                    <h1 className='text-md font-bold'>Recommended Profiles</h1>
                    <h2 className='text-sm'>Resume fit for the Job role</h2>
                </div>
                <div className='row-span-2'>

                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Relevance Score</TableHead>
                                <TableHead>Resume Link</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Prabhat</TableCell>
                                <TableCell>100</TableCell>
                                <TableCell>Link</TableCell>
                                <Dialog>
                <DialogTrigger asChild>
                <TableCell className="text-right cursor-pointer">View Details</TableCell>
                    
                    {/* <Button className='bg-[#5E5ADB] p-2 px-5 text-white text-sm rounded-md'>Attach File </Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>name</DialogTitle>
                        <DialogDescription>
                            username
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="college" className="w-[450px]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="college">College</TabsTrigger>
                            <TabsTrigger value="project">Project</TabsTrigger>
                            <TabsTrigger value="professional    ">Professional Education</TabsTrigger>
                        </TabsList>
                        <TabsContent value="college">
                            <Card>
                                <CardHeader>
                                    {/* <CardTitle>College</CardTitle> */}
                                    {/* <CardDescription>
                                        Make changes to your account here. Click save when you're done.
                                    </CardDescription> */}
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <div className="">
                                        <Label htmlFor="name">Name:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="branch">Branch:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="degree">Degree:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="cgpa">CGPA:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="start">Start:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="end">End:</Label>

                                    </div>
                                </CardContent>

                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password here. After saving, you'll be logged out.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save password</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
                            </TableRow>
                        </TableBody>
                    </Table>

                </div>
            </div>
            <Separator className="my-4" />
            <div className='grid grid-col-3 grid-flow-col'>
                <div className='row-span-1'>
                    <h1 className='text-md font-bold'>Non-Recommended Profiles</h1>
                    <h2 className='text-sm'>Resume that don't fit for the Job role</h2>
                </div>
                <div className='row-span-2'>

                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Relevance Score</TableHead>
                                <TableHead>Resume Link</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Prabhat</TableCell>
                                <TableCell>100</TableCell>
                                <TableCell>Link</TableCell>
                                <Dialog>
                <DialogTrigger asChild>
                <TableCell className="text-right">View Details</TableCell>
                   
                    {/* <Button className='bg-[#5E5ADB] p-2 px-5 text-white text-sm rounded-md'>Attach File </Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>name</DialogTitle>
                        <DialogDescription>
                            username
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="college" className="w-[450px]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="college">College</TabsTrigger>
                            <TabsTrigger value="project">Project</TabsTrigger>
                            <TabsTrigger value="professional    ">Professional Education</TabsTrigger>
                        </TabsList>
                        <TabsContent value="college">
                            <Card>
                                <CardHeader>
                                    {/* <CardTitle>College</CardTitle> */}
                                    {/* <CardDescription>
                                        Make changes to your account here. Click save when you're done.
                                    </CardDescription> */}
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <div className="">
                                        <Label htmlFor="name">Name:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="branch">Branch:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="degree">Degree:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="cgpa">CGPA:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="start">Start:</Label>

                                    </div>
                                    <div className="">
                                        <Label htmlFor="end">End:</Label>

                                    </div>
                                </CardContent>

                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>
                                        Change your password here. After saving, you'll be logged out.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save password</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
                            </TableRow>
                        </TableBody>
                    </Table>

                </div>
            </div>
            
        </div>
    )
}

export default result