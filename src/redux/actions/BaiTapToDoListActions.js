import { CHANGE_THEME,ADD_TASK, DONE_TASK, DELETE_TASK, EDIT_TASK, UPDATE_TASK } from "../types/BaiTapToDoListTypes";

export const actionChangeTheme = (themeId) => ({
    type: CHANGE_THEME,
    themeId
})

export const actionAddTask = (newTask) => ({
    type: ADD_TASK,
    newTask
})

export const actionDoneTask = (taskId) => ({
    type: DONE_TASK,
    taskId
})

export const actionDeleteTask = (taskId) => ({
    type: DELETE_TASK,
    taskId
})

export const actionEditTask = (task) => ({
    type: EDIT_TASK,
    task
})

export const actionUpdateTask = (taskName) => ({
    type: UPDATE_TASK,
    taskName
})
