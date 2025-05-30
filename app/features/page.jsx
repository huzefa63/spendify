import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Visual Charts & Graphs",
    description:
      "Gain financial clarity with dynamic line and bar charts. Instantly visualize monthly trends, category spending, and income flow.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Advanced Filtering",
    description:
      "Filter transactions by category, date range, or type (income/expense). Find what you need in seconds for faster analysis.",
    icon: ArrowPathIcon,
  },
  {
    name: "Category-Based Tracking",
    description:
      "Track spending across categories like food, travel, utilities, and more. Understand where your money really goes.",
    icon: FingerPrintIcon,
  },
  {
    name: "Income vs Expense Insights",
    description:
      "See a clear breakdown of your earnings and spending. Identify surpluses, deficits, and balance your budget smartly.",
    icon: LockClosedIcon,
  },
];

function Page() {
  return (
    <div className="bg-[var(--background)] text-[var(--text)] py-16 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Smarter Finance. Better Life.
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--textDark)] sm:text-5xl lg:text-balance">
            Everything you need to track and manage your money
          </p>
          <p className="mt-6 text-lg/8 text-[var(--muted)]">
            From real-time insights to category breakdowns and intelligent
            filters, our finance tracker is built to simplify your money
            management. Whether you're budgeting for groceries or analyzing your
            monthly trends, it's all just a tap away.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold ">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-[var(--muted)]">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Page;
