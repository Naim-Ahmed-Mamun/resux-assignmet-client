import { IAddBook, IBook } from './../../../types/globalTypes';
import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<{ statusCode: number; success: boolean; message: string; data: IBook[] }, void>({
      query: () => '/books',
      providesTags: ["books"]
    }),
    getRecentBooks: builder.query<{ statusCode: number; success: boolean; message: string; data: IBook[] }, void>({
      query: () => '/books/recent-books',
      providesTags: ["recent-books"]
    }),
    singleBook: builder.query<{ statusCode:number;success: boolean;message:string;data:IBook},string>({
      query: (id) => `/books/${id}`,
      providesTags:['book']
    }),
    postReview: builder.mutation<{ statusCode:number;success: boolean;message:string;data:IBook},{id:string;data:{review:string}}>({
      query: ({ id, data }) => ({
        url: `/books/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['book'],
    }),
    postBook: builder.mutation<{ statusCode:number;success: boolean;message:string;data:IBook},IAddBook>({
      query: (data) => ({
        url: `/books/add-book`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books',"recent-books"],
    }),
    editBook: builder.mutation<{ statusCode:number;success: boolean;message:string;data:IBook},{id:string;data:IAddBook}>({
      query: ({ id, data }) => ({
        url: `/books/edit-book/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books',"recent-books"],
    }),
    deleteBook: builder.mutation<{ statusCode:number;success:boolean;message:string;data:IBook},string>({
      query(id: string) {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['books',"recent-books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
  useGetRecentBooksQuery,
  usePostBookMutation,
  useEditBookMutation,
  useDeleteBookMutation
} = productApi;
