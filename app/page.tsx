import { Inter } from "next/font/google";
import Calendar from "./components/Calendar/Calendar";

const inter = Inter({ subsets: ["latin"] });
export default Home;
function Home() {
  return (
    <>
      <main className="flex flex-col items-center mt-20">
        <h4 className="animate-load">
          당신만을 위한 체육관이 준비되어 있습니다 하루하루 기록하여 피지컬을
          높여보세요!
        </h4>
        <div className="flex flex-row mt-3 justify-center w-4/5 h-52">
          <Calendar />
        </div>
      </main>
    </>
  );
}
