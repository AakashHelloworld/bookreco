import Login from "./_components/Login";
export default function Home() {
  return (
      <div className="flex min-h-screen h-screen">

        <div className="w-[60%] h-full relative ">
        

          <div className="bg-[url('/images/bookcoverpage.jpg')] bg-cover bg-center bg-no-repeat w-full h-full ">
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[100%] w-[100%] bg-gradient-to-br from-[#232e7f] to-[#f36026] opacity-80 z-10 flex items-end">
          <div className="text-white mb-10 ml-10 ">
            <img src="/images/logo.svg" className="h-[200px] w-[200px]" />
            {/* <h1 className=" text-4xl font-bold">BookReco</h1> */}
            <p className="text-xl font-medium mt-[-50px]">Platfom for your favorite books.</p>
            </div>
          </div>

        </div>

        <div className="w-[40%] flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2">
         <Login />
         </div>
        </div>

      </div>

  );
}
