import { createReducer, on } from "@ngrx/store";
import { Teacher } from "./teacher";
import { deleteTeacherAPISuccess, saveTeacherAPISuccess, teachersFetchAPISuccess, updateTeacherAPISuccess } from "./teachers.action";

export const initialState: ReadonlyArray<Teacher> = [];
    // {
    //   "id": 1,
    //   "name": "Shamim Hossain",
    //   "email": "shamim82@gmail.com",
    //   "mobile_1": 54767654,
    //   "mobile_2": 74563545,
    //   "address": "Magura, Barisal",
    //   "occapation": "Manager",
    //   "birthday": new Date()
    // }
  

export const teacherReducer = createReducer(
    initialState,
    on(teachersFetchAPISuccess, (state, { allTeachers }) => {
        return allTeachers
    }),
    on(saveTeacherAPISuccess, (state, { response }) => {
        let newState = [...state];
        newState.unshift(response);
        return newState;
    }),
    on(updateTeacherAPISuccess, (state, { response }) => {
        let newState = state.filter(item => item.id !== response.id);
        newState.unshift(response);
        return newState;
    }),
    on(deleteTeacherAPISuccess,(state, {id}) => {
        let newState = state.filter(item => item.id !== id)
        return newState
    })
);
