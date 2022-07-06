import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Teacher } from "./teacher";


export const selectTeachers = createFeatureSelector<Teacher[]>("myteachers")

export const selectTeacherById = (teacherId: number) => {
    return createSelector(selectTeachers, (teachers: Teacher[]) => {
       var teacherById = teachers.filter(item => item.id == teacherId);
       if(teacherById.length == 0) {
        return null;
       }
       return teacherById[0]
    })
}