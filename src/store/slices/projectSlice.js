import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    error: null,
    message: null,
    projects: [],
    singleProject: [],
  },
  reducers: {
    getAllProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.projects = [];
    },
    getAllProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.projects = action.payload;
    },
    getAllProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.projects = [];
    },
    addProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updateProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetProjectSlice(state, action) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.projects = state.projects;
    },
  },
});

// GET ALL PROJECTS REQUEST
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/project/getall",
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.getAllProjectSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectFailed(error.response.data.message)
    );
  }
};

// DELETE PROJECT REQUEST
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

// ADD PROJECT REQUEST
export const addNewProject = (projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.addProjectRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/project/add",
      projectData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(projectSlice.actions.addProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addProjectFailed(error.response.data.message)
    );
  }
};

// UPDATE PROJECT REQUEST
export const updateProject = (id, updatedData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());

  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/project/update/${id}`,
      updatedData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

// RESET ALL PROJECT SLICE
export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

// CLEAR ALL ERRORS
export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
