import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function Layout() {
  return (
    <>
      <div
        id="header-layout"
        className="flex h-fit justify-center bg-primary shadow-lg "
      >
        <Header />
      </div>
      <div id="app-layout" className="flex justify-center font-nunito">
        <div id="container--main" className="min-h-dvh w-full max-w-[1500px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
