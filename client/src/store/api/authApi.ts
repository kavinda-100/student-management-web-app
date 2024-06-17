import { UserSchemaType } from "@/zod/inCommingDataSchema";
import { baseApi } from "./baseApi";
import { LoginFromTypeWithUserRole } from "@/zod/outGoingDataSchema";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserSchemaType, LoginFromTypeWithUserRole>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});