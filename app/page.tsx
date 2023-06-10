import { Inter } from "next/font/google";
import Calendar from "./components/Calendar/Calendar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });
export default Home;
async function Home() {
  let session = await getServerSession(authOptions);
  return (
    <>
      <main className="flex flex-col items-center desktop:mt-10">
        <div className="mx-4">
          <p className="animate-load text-sm desktop:text-2xl">
            당신만을 위한 체육관이 준비되어 있습니다 하루하루 기록하여 피지컬을
            높여보세요!
          </p>
        </div>
        <div className="flex flex-row justify-center desktop:w-4/5 h-52 desktop:mt-6 mx-4">
          <Calendar session={session} />
        </div>
      </main>
    </>
  );
}
