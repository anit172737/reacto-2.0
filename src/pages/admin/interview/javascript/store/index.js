import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  JavascriptFetch,
  JavascriptAdd,
  JavascriptEdit,
  JavascriptDelete,
} from "../../../../../services/apiEndpoints";
import {
  privateGet,
  privatePost,
  privatePut,
  privateDelete,
} from "../../../../../services/privateRequest";

export const fetchJsQtnList = createAsyncThunk(
  "javascriptMaster",
  async ({ search, pageSize, pageNumber, setLoader }, { dispatch }) => {
    try {
      setLoader(true);
      const response = await privateGet(
        JavascriptFetch +
          `?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      console.log("response", response);
      if (response.data.hasOwnProperty("error")) {
        setLoader(false);
        toast.error(response.data.error);
      } else {
        setLoader(false);
        return {
          qtnList: response.data.data.questions,
          total: response.data.data.total,
        };
      }
    } catch (error) {
      setLoader(false);
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addJsQtn = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
    console.log("params.data", params.data);
    try {
      await privatePost(JavascriptAdd, params.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchJsQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.error);
    }
  }
);

export const editJsQtn = createAsyncThunk(
  "javascriptMaster",
  async (params, { dispatch }) => {
    try {
      await privatePut(JavascriptEdit, params?.id, params?.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchJsQtnList({ ...params }));
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
      await privateDelete(JavascriptDelete, params.id).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchJsQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

const javascriptMaster = createSlice({
  name: "javascriptMaster",
  initialState: {
    qtnList: [],
    total: null,
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
      state.qtnList = action?.payload?.qtnList;
      state.total = action?.payload?.total;
    });
  },
});

export const { setSearch, setSelecetd, setOpenForm, setOpenDeleteForm } =
  javascriptMaster.actions;

export default javascriptMaster.reducer;
