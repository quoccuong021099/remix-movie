import React from "react";
import { Outlet } from "remix";
import Appbar from "~/components/Appbar";

export default function movie() {
  return (
    <div>
      <Outlet />
      <Appbar />
    </div>
  );
}
