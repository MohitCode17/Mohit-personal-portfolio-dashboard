import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    error: null,
    message: null,
    timeline: [],
  },

  reducers: {
    getAllTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.timeline = [];
    },
    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.timeline = action.payload;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.timeline = [];
    },
    addNewTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetTimelineSlice(state, action) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

// GET ALL TIMELINE REQUEST
export const getAllTimelines = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/timeline/getall",
      { withCredentials: true }
    );

    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

// DELETE TIMELINE REQUEST
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );

    console.log(data);
    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));

    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

// ADD TIMELINE REQUEST
export const addTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addNewTimelineRequest());

  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/timeline/add",
      timelineData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(timelineSlice.actions.addNewTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addNewTimelineFailed(error.response.data.message)
    );
  }
};

// RESET ALL TIMELINES
export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

// CLEAR ALL ERRORS
export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export default timelineSlice.reducer;
