"use client";

import Link from "next/link";

export const Navbar = () => (
  <div className="navbar bg-base-100 prose min-w-full">
    <Link href={"/"} className="btn btn-ghost normal-case text-xl">
      Home
    </Link>
    <Link href={"/todos"} className="btn btn-ghost normal-case text-xl">
      Todos
    </Link>
  </div>
);
