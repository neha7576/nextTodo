import Header from "@/components/header";

export default function AboutUsPage(){
    return(
        <div className="min-h-screen w-full flex flex-col bg-gray-100">
            <Header showDrawer={false} showNoti ={false} title= "Abou Us" />
             <main className="flex-1 p-4">
                <p>Content</p>
            </main>
        </div>
    )
}