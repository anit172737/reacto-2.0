import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  ReactFetch,
  ReactAdd,
  ReactEdit,
  ReactDelete,
} from "../../../../../services/apiEndpoints";
import {
  privateGet,
  privatePost,
  privatePut,
  privateDelete,
} from "../../../../../services/privateRequest";

export const fetchReactQtnList = createAsyncThunk(
  "reactMaster",
  async (params, { dispatch }) => {
    try {
      const response = await privateGet(
        ReactFetch +
          `?search=${params?.search}&pageSize=${params?.pageSize}&pageNumber=${params?.pageNumber}`
      );
      return {
        reactQtnList: response.data.data.questions,
        total: response.data.data.total,
      };
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addReactQtn = createAsyncThunk(
  "reactMaster",
  async (params, { dispatch }) => {
    console.log("params.data", params.data);
    try {
      await privatePost(ReactAdd, params.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchReactQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.error);
    }
  }
);

export const editReactQtn = createAsyncThunk(
  "reactMaster",
  async (params, { dispatch }) => {
    try {
      await privatePut(ReactEdit, params?.id, params?.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchReactQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const deleteReactQtn = createAsyncThunk(
  "reactMaster",
  async (params, { dispatch }) => {
    try {
      await privateDelete(ReactDelete, params.id).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchReactQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

const reactMaster = createSlice({
  name: "reactMaster",
  initialState: {
    reactQtnList: [],
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
    builder.addCase(fetchReactQtnList.fulfilled, (state, action) => {
      state.reactQtnList = action?.payload?.reactQtnList;
      state.total = action?.payload?.total;
    });
  },
});

export const { setSearch, setSelecetd, setOpenForm, setOpenDeleteForm } =
  reactMaster.actions;

export default reactMaster.reducer;
