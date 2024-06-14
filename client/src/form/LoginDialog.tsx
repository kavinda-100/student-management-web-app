import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleArrowRight, ShieldCheck } from "lucide-react";
import { ZodRoleType } from "@/zod";
import { LoginForm } from "@/form/LoginForm";

type Props = {
  role: ZodRoleType;
  title: string;
};

export function LoginDialog({ role, title }: Props) {
  const [open, setOpen] = React.useState(false);

  const getWindowWidth = () => {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return windowWidth;
  };

  const windowWidth = getWindowWidth();

  if (windowWidth >= 768) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="w-full cursor-pointer dark:shadow-gray-900">
            <CardHeader>
              <CardTitle>
                <ShieldCheck />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <p className="text-lg md:text-xl">SignIn as {title}</p>
              <CircleArrowRight />
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Welcome</DrawerTitle>
          </DrawerHeader>
          <LoginForm role={role} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card className="w-full cursor-pointer dark:shadow-gray-900">
          <CardHeader>
            <CardTitle>
              <ShieldCheck />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <p className="text-lg md:text-xl">SignIn as {title}</p>
            <CircleArrowRight />
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Welcome</DrawerTitle>
        </DrawerHeader>
        <LoginForm role={role} className="p-4"/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// function ProfileForm({ className }: React.ComponentProps<"form">) {
//   return (
//     <form className={cn("grid items-start gap-4", className)}>
//       <div className="grid gap-2">
//         <Label htmlFor="email">Email</Label>
//         <Input type="email" id="email" defaultValue="shadcn@example.com" />
//       </div>
//       <div className="grid gap-2">
//         <Label htmlFor="username">Username</Label>
//         <Input id="username" defaultValue="@shadcn" />
//       </div>
//       <Button type="submit">Save changes</Button>
//     </form>
//   );
// }

