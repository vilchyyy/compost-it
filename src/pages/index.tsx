import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Chat from "../components/Chat";
import React, { useState } from "react";


import { trpc } from "../utils/trpc";

// import  Input  from "../components/Input.tsx";

import { useRouter } from "next/router";

import { S3Client } from "@aws-sdk/client-s3";
import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const credentials = {
  accessKeyId: "LfTlPaILdwOGcyyH",
  secretAccessKey: "H8vEZ8zEA633ZjtkjO1jg7YG9dS3SrjJUHmId46J"
};

const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global"
});

const Home: NextPage = () => {
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState<any>()
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  
console.log(credentials)

// Create an S3 service client object.


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {/* <Input label="Testing" /> */}
        <form onSubmit={async (e) => {
          e.preventDefault()
          // Upload a file
          const upload_data = await s3Client.send(
            new PutObjectCommand({
            Bucket: "compostovnik",
            Key: file.name,
            Body: file
            })
);
console.log(upload_data);
        }}>
          <input type="file" onChange={(e) => {
            if (!e.target.files) return;
            setFile(e.target.files[0])
            }}/>
            <button type="submit"> aaaa</button>
        </form>
        

        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { data: userData } = trpc.auth.getCurrUser.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  if (sessionData?.user?.name === null) {
    console.log(userData);
    router.push("/register");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData && <Chat username={sessionData?.user?.name}></Chat>}
      <p>{sessionData ? userData?.id : "balls"}</p>

      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
