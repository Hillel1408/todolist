import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
    const { data } = await axios.get('/lists?_expand=color&_embed=tasks');
    return data;
});

export const fetchColors = createAsyncThunk('lists/fetchColors', async () => {
    const { data } = await axios.get('/colors');
    return data;
});

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        lists: null,
        colors: null,
    },
    reducers: {
        onAddList(state, action) {
            state.lists.push(action.payload.listObj);
        },
        onRemove(state, action) {
            state.lists = state.lists.filter(
                (item) => item.id !== action.payload
            );
        },
        onAddTask(state, action) {
            state.lists.map((item) => {
                if (item.id === action.payload.list.id)
                    item.tasks.push(action.payload.data);
                return item;
            });
        },
        onEditListTitle(state, action) {
            state.lists.map((item) => {
                if (item.id === action.payload.list.id) {
                    item.name = action.payload.newTitle;
                }
                return item;
            });
        },
        onRemoveTask(state, action) {
            state.lists.map((item) => {
                if (item.id === action.payload.listId) {
                    item.tasks = item.tasks.filter(
                        (task) => task.id !== action.payload.taskId
                    );
                }
                return item;
            });
        },
        onCompleteTask(state, action) {
            state.lists.map((list) => {
                if (list.id === action.payload.listId) {
                    list.tasks = list.tasks.map((task) => {
                        if (task.id === action.payload.taskId) {
                            task.completed = action.payload.completed;
                        }
                        return task;
                    });
                }
                return list;
            });
        },
        onEditTask(state, action) {
            state.lists.map((list) => {
                if (list.id === action.payload.listId) {
                    list.tasks = list.tasks.map((task) => {
                        if (task.id === action.payload.taskObj.id) {
                            task.text = action.payload.newTaskText;
                        }
                        return task;
                    });
                }
                return list;
            });
        },
    },
    extraReducers: {
        [fetchLists.fulfilled]: (state, action) => {
            state.lists = action.payload;
        },
        [fetchColors.fulfilled]: (state, action) => {
            state.colors = action.payload;
        },
    },
});

export const {
    onAddList,
    onRemove,
    onAddTask,
    onEditListTitle,
    onRemoveTask,
    onCompleteTask,
    onEditTask,
} = todoSlice.actions;

export default todoSlice.reducer;
