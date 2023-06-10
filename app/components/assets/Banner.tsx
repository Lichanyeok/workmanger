"use client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session, getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Banner(props: any) {
  return (
    <div className="h-14 flex items-center justify-end mr-4 desktop:mr-16 mt-3">
      {props.session ? (
        <p
          onClick={() => {
            signOut();
          }}>
          {props.session.user.name}
        </p>
      ) : (
        <button
          onClick={() => {
            signIn();
          }}
          className="bg-midnight desktop:px-8 desktop:py-2 px-3 py-1 rounded-lg ">
          로그인
        </button>
      )}
    </div>
  );
}
