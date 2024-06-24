import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
    message: null,
    messages: [],
  },

  reducers: {
    getAllMessagesRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.messages = [];
    },
    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.messages = [];
    },
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetMessageSlice(state, action) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.messages = state.messages;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

// GET ALL MESSAGES REQUEST
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());

  try {
    const { data } = await axios.get("http://localhost:8000/api/v1/message", {
      withCredentials: true,
    });

    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};

// DELETE MESSAGE REQUEST
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(error.response.data.message)
    );
  }
};

// RESET ALL MESSAGES
export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

// CLEAR ALL ERRORS
export const clearAllMessagesErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export default messageSlice.reducer;
