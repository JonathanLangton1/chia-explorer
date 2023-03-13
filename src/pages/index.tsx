import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "~/components/Header/Header";
import { Search } from "react-feather";
import BlockViewer3D from "~/components/Header/BlockViewer3D/BlockViewer3D";
import { api } from "~/utils/api";
import { Canvas, useFrame } from '@react-three/fiber'

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Chia Explorer</title>
        <meta name="description" content="Explore the Chia blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-[#FBFDFF] px-8">

        <div className="max-w-[1536px] w-full">
          <div className="w-full h-[40rem] rounded-[2rem] bg-gradient-to-b from-green-400 to-green-600 mt-4 flex flex-col justify-start md:justify-center p-8 py-16 md:p-20">
            <h1 className="text-6xl font-bold text-white mb-12">Explore Freedom.</h1>
            <form className="w-full relative flex items-center">
              <Search className="absolute left-8 text-white stroke-[4px] w-8 h-8" />
              <input type="text" placeholder="Search by Address / Txn Hash / Block / Token / Domain Name" className="shadow-inner w-full text-xl text-white rounded-full py-8 px-8 pl-20 bg-green-700 placeholder-white/50 focus:outline-none focus:ring focus:ring-white/80 transition" />
            </form>
            <Canvas className="">
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <BlockViewer3D position={[-1.2, 0, 0]} />
              <BlockViewer3D position={[1.2, 0, 0]} />
            </Canvas>
          </div>
        </div>






        {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
