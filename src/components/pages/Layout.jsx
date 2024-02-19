import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function Layout() {
  return (
    <div
      id="app-layout"
      className="flex justify-center font-nunito dark:bg-slate-900"
    >
      <div
        id="container--main"
        className="min-h-dvh w-full max-w-[1500px] dark:bg-slate-900"
      >
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
