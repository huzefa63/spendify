import Navbar from "@/app/_components/Navbar";

function Layout({ children }) {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full w-full  border-white bg-[var(--background)]">
        {children}
      </div>
    </div>
  );
}

export default Layout;
