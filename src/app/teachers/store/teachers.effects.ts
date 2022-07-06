import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { TeachersService } from "../teachers.service";
import { deleteTeacherAPISuccess, invokeDeleteTeacherAPI, invokeSaveTeacherAPI, invokeTeachersAPI, invokeUpdateTeacherAPI, saveTeacherAPISuccess, teachersFetchAPISuccess, updateTeacherAPISuccess } from "./teachers.action";
import { selectTeachers } from "./teachers.selector";

@Injectable()
export class TeachersEffects {
    constructor(
        private actions$: Actions,
        private teacherService: TeachersService,
        private appStore:Store<Appstate>,
        private store:Store
    ) { }

    loadAllTeachers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeTeachersAPI),
            withLatestFrom(this.store.pipe(select(selectTeachers))),
            switchMap(([,teachersFromStore]) => {
                if(teachersFromStore.length > 0) {
                    return EMPTY;
                }
                return this.teacherService.get()
                    .pipe(
                        map((data) => teachersFetchAPISuccess({ allTeachers: data }))
                    )
            })
        )
    )

    saveNewTeacher$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeSaveTeacherAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus:''}}))
                // this.appStore.dispatch(setAPIStatus({ apiStatus: {apiResponseMessage: '', apiStatus: '';}}))
                return this.teacherService
                    .create(action.payload)
                    // .pipe(map((data) => saveTeacherAPISuccess({ response: data })));
                    .pipe(map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus:'success'}}))
                        return saveTeacherAPISuccess({ response: data })
                    }));
            })
        )
    )

    // Update Teacher Effect
    updateTeacher$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUpdateTeacherAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus:''}}))
                // this.appStore.dispatch(setAPIStatus({ apiStatus: {apiResponseMessage: '', apiStatus: '';}}))
                return this.teacherService
                    .update(action.payload)
                    // .pipe(map((data) => saveTeacherAPISuccess({ response: data })));
                    .pipe(map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus:'success'}}))
                        return updateTeacherAPISuccess({ response: data })
                    }));
            })
        )
    )

    // Delete Teacher
    deleteTeacher$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeDeleteTeacherAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus:''}}))
                // this.appStore.dispatch(setAPIStatus({ apiStatus: {apiResponseMessage: '', apiStatus: '';}}))
                return this.teacherService
                    .delete(action.id)
                    // .pipe(map((data) => saveTeacherAPISuccess({ response: data })));
                    .pipe(map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus: {apiResponseMessage:'', apiStatus:'success'}}))
                        return deleteTeacherAPISuccess({ id: action.id })
                    }));
            })
        )
    )
}
