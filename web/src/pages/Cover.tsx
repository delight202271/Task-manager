import { Link } from "react-router-dom";
const Cover = () => {
  return (
    <section className="min-h-[calc(100vh-73px)] bg-[#FAF8FB]">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-12 md:flex-row md:justify-between md:gap-12 md:px-10 md:py-20">

        {/* Cover Text */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="font-['Signika_Negative'] text-4xl font-semibold leading-tight tracking-normal text-[#292929] md:text-5xl">
            Manage your Tasks on{" "}
            <span className="text-[#974FD0]">TaskDuty</span>
          </h1>

          <p className="mt-6 max-w-lg font-['Signika_Negative'] text-lg leading-8 text-[#292929]/70">
          Stay organized and take control of your daily responsibilities with TaskDuty. Create, manage, and track your tasks efficiently, keep up with important deadlines, and maintain a clear view of what needs to be done all in one simple and reliable task management platform.

          </p>

          <button className="m-6 -translate-x-6">
            <Link
            to="/all-tasks"
            className="mt-8 rounded-lg bg-[#974FD0] px-4 py-3 font-['Signika_Negative'] text-[22px] font-medium text-white transition duration-200 hover:bg-[#8635c9]"
          >
            Go to My Tasks
          </Link>
          </button>
        </div>

        {/* Cover Illustration */}
        <div className="w-full max-w-md md:w-[48%] md:max-w-none">
          <img
            src="/Component 1.png"
            alt="TaskDuty task management illustration"
            className="w-full"
          />
        </div>

      </div>
    </section>
  );
};

export default Cover;

