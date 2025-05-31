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
      className={`lg:pt-20 pt-20 lg:pl-52 pb-5 w-full h-screen overflow-auto customized-scroll-bar tracking-wide text-[var(--textDark)] ${inter.className}`}
    >
      <section className=" flex-col  flex justify-center items-center">
        <SettingsForm />
       <CategoryForm />
      </section>
    </div>
  );
}

export default Page;
