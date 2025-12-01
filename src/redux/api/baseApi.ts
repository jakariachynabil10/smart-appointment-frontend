

import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "../tag-types";


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "https://smart-appointment-backend.vercel.app/api" }),
  endpoints: () => ({}),
  tagTypes : tagTypes,
});
