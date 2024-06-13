import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const Welcome = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold text-gray-700 md:text-2xl text-pretty dark:text-gray-400">
        <span className="text-2xl md:text-3xl">Welcome!</span>{" "}
        Manage your classes, grades, and resources all in one place. Streamline
        your academic life! Access your schedule, assignments, and announcements
        with ease.
      </h1>
    </section>
  );
};

export default Welcome;
