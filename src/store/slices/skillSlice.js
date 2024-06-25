import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    error: null,
    message: null,
    skills: [],
  },
  reducers: {
    getAllSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.skills = [];
    },
    getAllSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.skills = action.payload;
    },
    getAllSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.skills = [];
    },
    addNewSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updateSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetSkillSlice(state, action) {
      state.error = null;
      state.skills = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

// GET ALL SKILL REQUEST
export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/skill/getall",
      { withCredentials: true }
    );

    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};

// DELETE SKILL REQUEST
export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/skill/delete/${id}`,
      { withCredentials: true }
    );

    console.log(data);
    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));

    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
  }
};

// ADD SKILL REQUEST
export const addNewSkill = (skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/skill/add",
      skillData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);
    dispatch(skillSlice.actions.addNewSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
  }
};

// UPDATE SKILL REQUEST
export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());

  try {
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/skill/update/${id}`,
      { proficiency },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);
    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
  }
};

// RESET ALL SKILLS
export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

// CLEAR ALL ERRORS
export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

export default skillSlice.reducer;
