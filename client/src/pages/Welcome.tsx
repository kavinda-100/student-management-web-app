import { LoginDialog } from "@/form/LoginDialog";


const Welcome = () => {
  return (
    <section className="grid h-screen place-items-center">
      <div className="w-full">
        <div className="items-center justify-center">
          <h1 className="text-2xl font-bold text-center text-transparent md:text-4xl text-pretty font-palanquin bg-clip-text bg-gradient-to-r from-gray-500 to-purple-400 dark:from-blue-300 dark:to-purple-400">
            <span className="text-3xl font-bold text-transparent xl:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
              Welcome!
            </span>{" "}
            <br />
            Manage your classes, grades, and resources all in one place. <br />
          </h1>
          <h3 className="text-xl font-bold text-center text-transparent md:text-2xl text-pretty font-palanquin bg-clip-text bg-gradient-to-r from-gray-400 to-purple-400 dark:from-blue-200 dark:to-purple-200">
            Streamline your academic life! Access your schedule, assignments,
            and announcements with ease.
          </h3>
        </div>

        {/* login section */}
        <div className="flex flex-col items-center justify-center w-full gap-5 mt-5 md:flex-row">
          <LoginDialog role="student" title="student" />
          <LoginDialog role="teacher" title="Teacher" />
          <LoginDialog role="admin" title="Administrator" />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
