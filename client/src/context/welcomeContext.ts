import { ZodRoleType } from "@/zod";
import { createContext, useContext } from "react";

type WelcomeContextType = {
    role: ZodRoleType
};