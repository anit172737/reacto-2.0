import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  NextFetch,
  NextAdd,
  NextEdit,
  NextDelete,
} from "../../../../../services/apiEndpoints";
import {
  privateGet,
  privatePost,
  privatePut,
  privateDelete,
} from "../../../../../services/privateRequest";

export const fetchNextQtnList = createAsyncThunk(
  "nextMaster",
  async (params, { dispatch }) => {
    try {
      const response = await privateGet(
        NextFetch +
          `?search=${params?.search}&pageSize=${params?.pageSize}&pageNumber=${params?.pageNumber}`
      );
      return {
        nextQtnList: response.data.data.questions,
        total: response.data.data.total,
      };
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addNextQtn = createAsyncThunk(
  "nextMaster",
  async (params, { dispatch }) => {
    console.log("params.data", params.data);
    try {
      await privatePost(NextAdd, params.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchNextQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.error);
    }
  }
);

export const editNextQtn = createAsyncThunk(
  "nextMaster",
  async (params, { dispatch }) => {
    try {
      await privatePut(NextEdit, params?.id, params?.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchNextQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const deleteNextQtn = createAsyncThunk(
  "nextMaster",
  async (params, { dispatch }) => {
    try {
      await privateDelete(NextDelete, params.id).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchNextQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

const nextMaster = createSlice({
  name: "nextMaster",
  initialState: {
    nextQtnList: [],
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
    builder.addCase(fetchNextQtnList.fulfilled, (state, action) => {
      state.nextQtnList = action?.payload?.nextQtnList;
      state.total = action?.payload?.total;
    });
  },
});

export const { setSearch, setSelecetd, setOpenForm, setOpenDeleteForm } =
  nextMaster.actions;

export default nextMaster.reducer;
