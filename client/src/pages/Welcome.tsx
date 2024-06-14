import { LoginDialog } from "@/form/LoginDialog";


const Welcome = () => {
  return (
    <section className="grid h-screen place-items-center">
      <div className="w-full">
        <div className="items-center justify-center">
          <h1 className="text-2xl font-bold text-center text-gray-700 md:text-4xl text-pretty dark:text-gray-400 font-palanquin">
            <span className="text-3xl xl:text-6xl">Welcome!</span>{" "}
            Manage your classes, grades, and resources all in one place. <br />
          </h1>
          <h3 className="text-xl font-bold text-center text-gray-700 md:text-2xl text-pretty dark:text-gray-400 font-palanquin">
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
