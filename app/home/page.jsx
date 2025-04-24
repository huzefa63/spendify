import { Poppins } from "next/font/google";
import Image from "next/image";
import AnimatedButton from "@/app/_components/AnimatedButton";
import Button from "../_ui/Button";
const poppins = Poppins({
    variable:'poppins',
    subsets:['latin'],
    weight:'600'
})
function Page() {
    return (
      <div
        className="bg-[var(--background)]   h-full w-full flex "
      >
        <section className="w-1/2 px-16 pt-5 flex flex-col gap-10">
          <h1
            className={`lg:text-4xl gap-1 flex flex-col tracking-wider  text-xl lg:mt-20  text-[var(--textDark)] lg:tracking-widest  ${poppins.className}`}
          >
            Revolutionizing Personal <span>finance with intelligent</span>
            <span className="lg:text-5xl dark:text-orange-400 text-blue-600">
              Expense Tracking.
            </span>
          </h1>
          <p className="text-[var(--text)] lg:w-[80%] font-semibold tracking-wide  ">
            "Take control of your spending with ease. Our smart and simple
            expense tracker helps you monitor every rupee, set saving goals, and
            build better habits — all in one place. Whether you're budgeting for
            the month or just want to know where your money goes, we’ve got you
            covered."
          </p>
          <AnimatedButton />
        </section>

        <section className="w-1/2">
          <div className="lg:w-[70%] lg:h-[50%] relative lg:mx-auto lg:mt-24 ">
            <Image
              src="/homeImg.jpg"
              className="rounded-md"
              fill
              alt="person accounting"
            />
          </div>
        </section>
      </div>
    );
}

export default Page
