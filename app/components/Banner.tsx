"use client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session, getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Banner(props: any) {
  console.log(props);
  return (
    <div className="h-14 flex items-center ml-4">
      <h4>LOGO</h4>
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
          }}>
          LOGIN
        </button>
      )}
    </div>
  );
}
