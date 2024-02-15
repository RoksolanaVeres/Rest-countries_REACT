import Header from "./components/Header";
import Filters from "./components/Filters";
import { ThemeContextProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <div
        id="app-layout"
        className="flex justify-center font-nunito dark:bg-slate-900"
      >
        <div
          id="container--main"
          className="min-h-dvh w-full max-w-[1500px] dark:bg-slate-900"
        >
          <Header />
          <main className="px-7 py-12 md:px-20">
            <Filters />
            <div className="grid grid-cols-auto-fill-265 gap-16 dark:text-white">
              <div className="h-[340px] bg-teal-700">1</div>
              <div className="h-[340px] bg-teal-700">2</div>
              <div className="h-[340px] bg-teal-700">3</div>
              <div className="h-[340px] bg-teal-700">4</div>
              <div className="h-[340px] bg-teal-700">5</div>
              <div className="h-[340px] bg-teal-700">6</div>
              <div className="h-[340px] bg-teal-700">7</div>
              <div className="h-[340px] bg-teal-700">8</div>
            </div>
          </main>
        </div>
      </div>
    </ThemeContextProvider>
  );
}
