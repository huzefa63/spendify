import { Inter } from "next/font/google";
import SettingsForm from "@/app/_components/SettingsForm";
import CategoryForm from "@/app/_components/CategoryForm";
const inter = Inter({
  variable: "inter",
  subsets: ["latin"],
  weight: "500",
});


function Page() {
  return (
    <div
      className={`pt-20 pl-56 pb-5 w-full h-screen overflow-auto tracking-wide text-[var(--textDark)] ${inter.className}`}
    >
      <section className=" flex-col  flex justify-center items-center">
        <SettingsForm />
       <CategoryForm />
      </section>
    </div>
  );
}

export default Page;
