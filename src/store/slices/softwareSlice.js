import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareSlice = createSlice({
  name: "software",
  initialState: {
    loading: false,
    error: null,
    message: null,
    softwares: [],
  },
  reducers: {
    getAllSoftwareRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.softwares = [];
    },
    getAllSoftwareSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.softwares = action.payload;
    },
    getAllSoftwareFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.softwares = [];
    },
    addNewSoftwareRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSoftwareFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteSoftwareRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSoftwareSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSoftwareFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetSoftwareSlice(state, action) {
      state.error = null;
      state.softwares = state.softwares;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.softwares = state.softwares;
    },
  },
});

// GET ALL SOFTWARE REQUEST
export const getAllSoftwares = () => async (dispatch) => {
  dispatch(softwareSlice.actions.getAllSoftwareRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/software/getall",
      { withCredentials: true }
    );

    dispatch(softwareSlice.actions.getAllSoftwareSuccess(data.softwares));
    dispatch(softwareSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareSlice.actions.getAllSoftwareFailed(error.response.data.message)
    );
  }
};

// DELETE SOFTWARE REQUEST
export const deleteSoftware = (id) => async (dispatch) => {
  dispatch(softwareSlice.actions.deleteSoftwareRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/software/delete/${id}`,
      { withCredentials: true }
    );

    console.log(data);
    dispatch(softwareSlice.actions.deleteSoftwareSuccess(data.message));

    dispatch(softwareSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareSlice.actions.deleteSoftwareFailed(error.response.data.message)
    );
  }
};

// ADD SOFTWARE REQUEST
export const addNewSoftware = (softwareData) => async (dispatch) => {
  dispatch(softwareSlice.actions.addNewSoftwareRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/software/add",
      softwareData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);
    dispatch(softwareSlice.actions.addNewSoftwareSuccess(data.message));
    dispatch(softwareSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareSlice.actions.addNewSoftwareFailed(error.response.data.message)
    );
  }
};

// RESET ALL SOFTWARE
export const resetSoftwareSlice = () => (dispatch) => {
  dispatch(softwareSlice.actions.resetSoftwareSlice());
};

// CLEAR ALL ERRORS
export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(softwareSlice.actions.clearAllErrors());
};

export default softwareSlice.reducer;
