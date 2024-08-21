import React from "react";
import YourSvg from "./NotFoundSign.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-screen  flex flex-col items-center bg-slate-900 justify-start">
      <Image
        src={YourSvg}
        className=" w-[26rem] h-[26rem]"
        alt="404 not found"
      />
      <div>
        <Button size="lg" asChild>
          <Link
            className="bg-slate-500 hover:bg-slate-600 rounded-xl mt-7"
            href="/"
          >
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
