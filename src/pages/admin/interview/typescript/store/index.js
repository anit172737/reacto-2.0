import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import {
  TypeFetch,
  TypeAdd,
  TypeEdit,
  TypeDelete,
} from "../../../../../services/apiEndpoints";
import {
  privateGet,
  privatePost,
  privatePut,
  privateDelete,
} from "../../../../../services/privateRequest";

export const fetchTypeQtnList = createAsyncThunk(
  "typeMaster",
  async ({ search, pageSize, pageNumber, setLoader }, { dispatch }) => {
    try {
      setLoader(true);
      const response = await privateGet(
        TypeFetch +
          `?search=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      if (response.data.hasOwnProperty("error")) {
        setLoader(false);
        toast.error(response.data.error);
        return {
          qtnList: [],
        };
      } else {
        setLoader(false);
        return {
          qtnList: response.data.data.questions,
          total: response.data.data.total,
        };
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message);
      return {
        qtnList: [],
      };
    }
  }
);

export const addTypeQtn = createAsyncThunk(
  "typeMaster",
  async (params, { dispatch }) => {
    try {
      await privatePost(TypeAdd, params.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchTypeQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.error);
    }
  }
);

export const editTypeQtn = createAsyncThunk(
  "typeMaster",
  async (params, { dispatch }) => {
    try {
      await privatePut(TypeEdit, params?.id, params?.data).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchTypeQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const deleteTypeQtn = createAsyncThunk(
  "typeMaster",
  async (params, { dispatch }) => {
    try {
      await privateDelete(TypeDelete, params.id).then((res) =>
        res.data.error
          ? toast.error(res.data.error)
          : toast.success(res.data.message)
      );
      dispatch(fetchTypeQtnList({ ...params }));
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

const typeMaster = createSlice({
  name: "typeMaster",
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
    builder.addCase(fetchTypeQtnList.fulfilled, (state, action) => {
      state.qtnList = action?.payload?.qtnList;
      state.total = action?.payload?.total;
    });
  },
});

export const { setSearch, setSelecetd, setOpenForm, setOpenDeleteForm } =
  typeMaster.actions;

export default typeMaster.reducer;
