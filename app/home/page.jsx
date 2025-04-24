import { Poppins } from "next/font/google";
import Image from "next/image";
import AnimatedButton from "@/app/_components/AnimatedButton";
import Button from "../_ui/Button";
import Slide from "@/app/_animation/Slide";
const poppins = Poppins({
    variable:'poppins',
    subsets:['latin'],
    weight:'600'
})
function Page() {
    return (
      <div className="bg-[var(--background)] h-full border-red w-full flex lg:flex-row flex-col">
        <section className="lg:w-1/2 w-full h-full border-white px-3 py-5 lg:px-16 lg:pt-5 flex flex-col gap-10 items-center lg:items-start">
          <h1
            className={`lg:text-4xl lg:text-left text-center gap-1 flex flex-col tracking-wider  text-3xl lg:mt-20  text-[var(--textDark)] lg:tracking-widest  ${poppins.className}`}
          >
            Revolutionizing Personal{" "}
            <span className="text-[1.8rem] lg:text-4xl">
              finance with intelligent
            </span>
            <Slide type="up" delay={0.2}>
              <span className="lg:text-5xl dark:text-purple-500 text-blue-600">
                Expense Tracking.
              </span>
            </Slide>
          </h1>

          {/* display image here in mobile screen */}

          <div className="w-3/4 min-h-1/3 relative lg:hidden ">
            <Image
              src="/homeImg.jpg"
              className="rounded-md"
              fill
              alt="person accounting"
            />
          </div>

          <div className="lg:hidden text-center">
            <p className="text-[var(--textDark)] font-bold mt-4 text-4xl tracking-widest flex flex-col  gap-2">
              <span>
                See Your{" "}
                <strong className="text-blue-600 dark:text-purple-500">
                  <em>Finances</em>
                </strong>
              </span>
              <span className="text-3xl tracking-wide ">
                Like never before.
              </span>
            </p>
            <p className="text-md mt-4 tracking-wider  text-emerald-500 font-semibold dark:text-blue-400">
              {" "}
              <strong>Visualize</strong>, <strong>categorize</strong>, and
              <strong> control</strong> your expenses{" "}
              <span className="block">just like a pro.</span>
            </p>
          </div>

          {/* displayed image here in mobile screen */}

          <p className="text-[var(--text)] lg:w-[80%] font-semibold tracking-wider  w-[85%]">
            "Take control of your spending with ease. Our smart and simple
            expense tracker helps you monitor every rupee, set saving goals, and
            build better habits — all in one place. Whether you're budgeting for
            the month or just want to know where your money goes, we’ve got you
            covered."
          </p>
          
            <AnimatedButton />
    
        </section>

        <section className="w-1/2 h-full hidden lg:flex lg:justify-center  pt-16">
          <div className="w-[70%] h-full relative   ">
            <div className="lg:w-full lg:h-[50%] relative">
              <Image
                src="/homeImg.jpg"
                className="rounded-md"
                fill
                alt="person accounting"
              />
            </div>
            <em className="text-[var(--textDark)] font-bold mt-4 text-4xl tracking-widest flex flex-col  gap-2">
              <span>
                See Your{" "}
                <strong className="text-blue-600 dark:text-purple-500">
                  Finances
                </strong>
              </span>
              <span className="text-3xl tracking-wide ">
                Like never before.
              </span>
            </em>
            <p className="text-lg   mt-4 tracking-wider  text-emerald-500 font-semibold dark:text-blue-400">
              {" "}
              <strong>Visualize</strong>, <strong>categorize</strong>, and
              <strong> control</strong> your expenses —{" "}
              <span className="block">just like a pro.</span>
            </p>
          </div>
        </section>
      </div>
    );
}

export default Page
