import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">404 - Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Button variant={"default"} size={"default"} asChild>
        <Link to="/dashboard">Go Back</Link>
      </Button>
    </section>
  );
};

export default NotFound;
