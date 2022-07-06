import { createAction, props } from "@ngrx/store";
import { Teacher } from "./teacher";

// Get Teacher
export const invokeTeachersAPI = createAction(
    "[Teachers API] invoke teachers Fetch API"
)

export const teachersFetchAPISuccess = createAction(
    "[Teachers API] teachers fetch api success",
    props<{allTeachers:Teacher[]}>()
)

// Add Teacher
export const invokeSaveTeacherAPI = createAction(
    "[Teachers API] invoke save teacher API",
    props<{ payload: Teacher }>()
)

export const saveTeacherAPISuccess = createAction(
    "[Teachers API] save teacher api success",
    props<{ response: Teacher }>()
)

// Update Teacher
export const invokeUpdateTeacherAPI = createAction(
    '[Teacher API] invoke update teacher API',
    props<{payload: Teacher}>()
)

export const updateTeacherAPISuccess = createAction(
    '[Teacher API] update teacher API success',
    props<{response: Teacher}>()
)

// Delete Teacher
export const invokeDeleteTeacherAPI = createAction(
    '[Teachers API] invoke Delete teacher API',
    props<{ id: number}>()
)

export const deleteTeacherAPISuccess = createAction(
    '[Teachers API] delete teacher API success',
    props<{ id: number}>()
)