"use client";
import AdminDrawer from "@/components/adminDrawer";
import Drawer from "@/components/drawer";
import Header from "@/components/header";
import Text from "@/components/ui/text";
import { LayoutDashboardIcon, List, ListCollapse, ListCollapseIcon, ListFilterIcon, LogOut, PersonStanding, User, User2, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminPage(){
    const [open , setOpen] = useState(false);
    return(
        <div className="min-h-screen w-full flex flex-col bg-blue-200">
            <Header showDrawer={true} showNoti={true} title="Dashboard"  onMenuClick={ () =>setOpen(true)}/>
              
                <main className="flex flex-row">
                    <div className="w-60 p-4">
                        <div className="bg-white p-4 rounded-2xl flex flex-row">
                            <div className="p-2 w-10 h-10 rounded-full  bg-blue-300 justify-center ">
                                <User size={20} />
                            </div>
                           <div className=" flex flex-col ml-2">
                                <Text variant="subheading">Admin</Text>
                                <Text variant="label">Admin</Text>
                            </div>
                        </div>  
                        <div className="flex flex-col mt-4">
                            <div className=" flex flex-row p-4 gap-2 rounded-2xl shadow">
                                <LayoutDashboardIcon size={20} />
                                <Text  variant="subheading" className="">Dashboard</Text>
                            </div>
                            <div className=" flex flex-row p-4  gap-2 rounded-2xl shadow">
                                <ListCollapseIcon size={20} />
                                <Text  variant="subheading">Tasks</Text>
                            </div>
                            <div className=" flex flex-row p-4 gap-2 rounded-2xl shadow">
                                <User2 size={20} />
                                <Text  variant="subheading" className="">Users</Text>
                            </div>
                              <div className=" flex flex-row p-4 gap-2 rounded-2xl shadow">
                                <LogOut size={20} />
                                <Text  variant="subheading" className="">Logout</Text>
                            </div>
                        </div>  
                    </div>
                     <div className="flex-1">
                        <p >middle</p>
                        
                    </div>
                     <div className="w-60">
                        <div className="m-6 p-2 bg-white rounded-2xl flex flex-col gap-4">
                           
                             <div className="flex flex-row items-center justify-between hover:bg-blue-200 p-2 rounded-2xl">

                                <div className="flex items-center gap-2">
                                    <List size={18} />
                                    <Text variant="body">All</Text>
                                </div>

                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                     <Text variant="body" className="text-white">37</Text>
                                </div>

                            </div>
                          <div className="flex flex-row items-center justify-between  hover:bg-blue-200 p-2 rounded-2xl">

                                <div className="flex items-center gap-2">
                                    <PersonStanding size={18} />
                                    <Text variant="body">Your Tasks</Text>
                                </div>

                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  
                                    <Text variant="body" className="text-white">37</Text>
                                </div>

                            </div>
                             <div className="flex flex-row items-center justify-between  hover:bg-blue-200 p-2 rounded-2xl">

                                <div className="flex items-center gap-2">
                                    <ListCollapse size={18} />
                                    <Text variant="body">Other Tasks</Text>
                                </div>

                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Text variant="body" className="text-white">37</Text>
                                </div>

                            </div>
                              <div className="flex flex-row items-center justify-between  hover:bg-blue-200 p-2 rounded-2xl
                              ">

                                <div className="flex items-center gap-2">
                                    <Users size={18} />
                                    <Text variant="body">Users</Text>
                                </div>

                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                     <Text variant="body" className="text-white">37</Text>
                                </div>

                            </div>
                             <Link href="/tasks/add_task" className="mt-10 mb-5">
                            <button className="block mx-auto w-36 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-400">
                                Add New Task
                            </button> 
                            </Link>
                            
                            
                        </div>
                        
                    </div>

                </main>

        </div>
    )
}