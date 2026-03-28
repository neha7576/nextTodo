import Image from "next/image";

export default function NoData(){
    return(
        <>
            <div className="flex flex-col justify-center items-center m-10 text-center">
            <Image src="/images/no_data.png" alt="No Data Found" width={200} height={200} />  

            <h2 className="text-xl font-semibold mt-20">
                No Tasks Found
            </h2>

            <p className="text-gray-500 mt-2">
                You haven’t added any tasks yet.
            </p>

            </div>
        </>
    )
}