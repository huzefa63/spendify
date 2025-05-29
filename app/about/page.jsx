const features = [
    {
      title: "Track Income & Expenses",
      desc: "Log every transaction effortlessly and categorize it for better budgeting.",
    },
    {
      title: "Visual Insights",
      desc: "Interactive charts and graphs give you a clear view of your monthly and yearly trends.",
    },
    {
      title: "Secure & Private",
      desc: "Your data is encrypted and stored securely. You stay in control.",
    },
    {
      title: "Real-Time Sync",
      desc: "All your data is instantly updated across devices with blazing-fast sync.",
    },
    {
      title: "Custom Categories",
      desc: "Tailor your tracking experience with personalized income and expense categories.",
    },
    {
      title: "Dark Mode",
      desc: "Enjoy a sleek, eye-friendly dark theme for late-night budget sessions.",
    },
  ]
function Page() {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-12 space-y-24">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400">
            About Our Finance Tracking App
          </h1>
          <p className="text-lg md:text-xl">
            Your personal companion to manage, track, and understand your
            finances — all in one place.
          </p>
        </section>

        {/* Mission */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-center">Our Mission</h2>
          <p className="text-center text-lg">
            We believe that financial clarity should be accessible to everyone.
            Our goal is to empower you with the tools and insights needed to
            take complete control over your money — from daily expenses to
            long-term financial planning.
          </p>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold">Built With Modern Tools</h2>
          <p className="text-lg">
            From backend to frontend, our stack ensures speed, reliability, and
            scalability.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
              React
            </span>
            <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
              Tailwind CSS
            </span>
            <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
              Node.js
            </span>
            <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
              Express
            </span>
            <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
              MongoDB
            </span>
            <span className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
              JWT Auth
            </span>
          </div>
        </section>

        {/* Call To Action */}
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-semibold text-green-600 dark:text-green-400">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg">
            Join others in building better habits, saving smarter, and spending
            consciously.
          </p>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition">
            Get Started Now
          </button>
        </section>
      </main>
    );
}

export default Page
