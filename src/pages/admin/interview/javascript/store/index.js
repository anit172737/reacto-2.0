import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../../../../app.config";
import { JavascriptFetch } from "../../../../../services/apiEndpoints";

export const fetchJsQtnList = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
    try {
      // console.log("params.search", params.search);
      const response = await axios.get(baseUrl + JavascriptFetch + `?search=${params.search}&pageSize=10&pageNumber=2`);
      return {
        jsQtnList: response.data.data.questions,
        total:response.data.data.total,
      };
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addJsQtn = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
    try {
      await axios
        .post(baseUrl + JavascriptFetch, params)
        .then((res) =>
          res.data.error
            ? toast.error(res.data.error)
            : toast.success(res.data.message)
        );
      dispatch(fetchJsQtnList());
      return true;
    } catch (error) {
      toast.error(error?.response?.error);
    }
  }
);

export const editJsQtn = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
   console.log('params', params)
    const payload = {id: params.id,
      question: params.question,
      answer: params.answer,
    }
    const searchParam = {
      search:params.Search
    }
    try {
      await axios
        .put(baseUrl + JavascriptFetch + `/${payload.id}`, payload)
        .then((res) =>
          res.data.error
            ? toast.error(res.data.error)
            : toast.success(res.data.message)
        );
      dispatch(fetchJsQtnList(searchParam));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const deleteJsQtn = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
    try {
      await axios
        .delete(baseUrl + JavascriptFetch + `/${params.id}`)
        .then((res) =>
          res.data.error
            ? toast.error(res.data.error)
            : toast.success(res.data.message)
        );
      dispatch(fetchJsQtnList());
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

const javascriptMaster = createSlice({
  name: "javascriptMaster",
  initialState: {
    jsQtnList: [],
    total:null,
    search: "",
    selected: null,
    openForm: false,
    openDeleteForm: false,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSelecetd: (state, action) => {
      state.selected = action.payload;
    },
    setOpenForm: (state, action) => {
      state.openForm = action.payload;
    },
    setOpenDeleteForm: (state, action) => {
      state.openDeleteForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJsQtnList.fulfilled, (state, action) => {
      state.jsQtnList = action?.payload?.jsQtnList;
      state.total=action?.payload?.total
    });
  },
});

export const { setSearch, setSelecetd, setOpenForm, setOpenDeleteForm } =
  javascriptMaster.actions;

export default javascriptMaster.reducer;
