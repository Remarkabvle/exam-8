import { api } from "./index";

export const commentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: (params) => ({
        url: "/comment",
        params,
      }),
      providesTags: ["Comment"],
    }),

    createComment: build.mutation({
      query: (body) => ({
        url: "/comment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: build.mutation({
      query: ({ id, body }) => ({
        url: `/comment/${id}`,
        method: "PATCH",
        body, 
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
