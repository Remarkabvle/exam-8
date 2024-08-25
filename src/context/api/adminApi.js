import { api } from "./index";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (params) => ({
        url: "/admin",
        params,
      }),
      providesTags: ["Admin"],
    }),
    loginAdmin: build.mutation({
      query: (body) => ({
        url: "/admin/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    registerAdmin: build.mutation({
      query: (body) => ({
        url: "/admin/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    getProfile: build.query({
      query: () => ({
        url: "/admin/profile",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useLoginAdminMutation,
  useRegisterAdminMutation,
  useGetProfileQuery,
} = adminApi;
