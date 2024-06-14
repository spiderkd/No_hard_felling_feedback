"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-orange-500 py-1 px-4 rounded m-4"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}


//https://downloads.mongodb.com/compass/mongodb-compass-1.43.1-darwin-arm64.dmg