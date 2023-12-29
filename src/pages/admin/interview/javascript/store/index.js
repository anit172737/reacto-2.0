import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../../../../app.config";
import { JavascriptFetch } from "../../../../../services/apiEndpoints";

export const fetchJsQtnList = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
    try {
      const response = await axios.get(baseUrl + JavascriptFetch);
      return {
        jsQtnList: response.data.data,
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
      
      await axios.post(baseUrl + JavascriptFetch, params)
      toast.success('Question added successfully')
      dispatch(fetchJsQtnList())
      return true
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const editJsQtn = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
    try {
      await axios.put(baseUrl + JavascriptFetch + `/${params.id}`, params).then(res=>res.data.error ? toast.error(res.data.error): toast.success(res.data.message))
      dispatch(fetchJsQtnList())
      return true
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const deleteJsQtn = createAsyncThunk(
  'javascriptMaster',
  async (params, { dispatch }) => {
    try {
      await axios.delete(baseUrl + JavascriptFetch + `/${params.id}`).then(res =>res.data.error?  toast.error(res.data.error): toast.success(res.data.message))
      dispatch(fetchJsQtnList())
      return true
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }
)

const javascriptMaster = createSlice({
  name: "javascriptMaster",
  initialState: {
    jsQtnList: [],
    search: "",
    selected: null,
    openForm: false,
    openDeleteForm:false
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSelecetd: (state, action) => {
      state.selected = action.payload
    },
    setOpenForm: (state, action) => {
      state.openForm = action.payload
    },
    setOpenDeleteForm: (state, action) => {
      state.openDeleteForm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJsQtnList.fulfilled, (state, action) => {
      state.jsQtnList = action.payload.jsQtnList;
    })
  },
});

export const { setSearch, setSelecetd, setOpenForm, setOpenDeleteForm } = javascriptMaster.actions;

export default javascriptMaster.reducer;
