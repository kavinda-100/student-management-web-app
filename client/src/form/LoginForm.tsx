import { useNavigate} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { ZodRoleType } from "@/zod";
import { cn } from "@/lib/utils";
import { logInFormSchema } from "@/zod/inputValidation";
import {useLoginMutation} from "@/store/api/authApi.ts";
import { setUser} from "@/store/features/userSlice.ts";

type Props = {
  role: ZodRoleType;
  className?: string;
};

export function LoginForm({ role, className }: Props) {
    // 1. Define a navigate hook.
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate("/dashboard", {replace: true});
    }
    // 1. Define a mutation hook.
    const [login, {isLoading}] = useLoginMutation();

    // 2. Define a form hook.
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof logInFormSchema>) {
    const data = {
      ...values,
      role,
    };
    // 4. Call the mutation hook.
    login(data)
        .unwrap()
        .then((data) => {
            toast.success("Login Success");
            console.log(data);
            setUser(data);
            // for debugging navigate to dashboard
            console.log("navigate to dashboard start");
            navigateToDashboard();
            console.log("navigated to dashboard end");

        })
        .catch((error) => {
            toast.error(error.data.message);
            console.log(error);
        });

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>Sign In</Button>
      </form>
    </Form>
  );
}
