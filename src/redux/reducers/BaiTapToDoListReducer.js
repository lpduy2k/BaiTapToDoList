import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme"
import { arrTheme } from "../../Themes/ThemeManager";
import { CHANGE_THEME,ADD_TASK, DONE_TASK, DELETE_TASK, EDIT_TASK, UPDATE_TASK } from "../types/BaiTapToDoListTypes";


const stateDefault = {
    themeToDoList: ToDoListDarkTheme,
    taskList:[],
    taskEdit:{id:'-1',taskName:'',done:false}
}

export const BaiTapToDoListReducer = (state = stateDefault,action) => {
    switch (action.type) {
        case CHANGE_THEME:{
            let changeTheme = arrTheme.find(theme => theme.id == action.themeId);
            if (changeTheme){
                state.themeToDoList = {...changeTheme.theme};
            }
            return {...state}
        }
        case ADD_TASK:{
            if (action.newTask.taskName.trim() === '') {
                alert('Task name is required!');
                return {...state}
            }
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName);
            if (index !== -1) {
                alert('Task name already exists!');
                return {...state};
            }
            state.taskList = [...taskListUpdate,action.newTask];
            return {...state}
        }
        case DONE_TASK:{
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === action.taskId);
            if (index !== -1) {
                taskListUpdate[index].done = true;
            }
            return {...state,taskList:taskListUpdate};
        }
        case DELETE_TASK:{
            let taskListUpdate = [...state.taskList];
            taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId);
            return {...state,taskList:taskListUpdate};
        }
        case EDIT_TASK:{
            return {...state,taskEdit:action.task};
        }
        case UPDATE_TASK:{
            state.taskEdit = {...state.taskEdit,taskName:action.taskName}
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);
            if (index !== -1) {
                taskListUpdate[index] = state.taskEdit;
            }
            state.taskList = taskListUpdate;
            state.taskEdit = {id:'-1',taskName:'',done:false};
            return {...state}
        }
        default: return {...state}
    }
}