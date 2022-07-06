import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Teacher } from '../store/teacher';
import { invokeSaveTeacherAPI } from '../store/teachers.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private store:Store,
    private appStore:Store<Appstate>,
    private router: Router
    ) { }

  teacherForm:Teacher = {
    id: 0,
    name: "",
    email: "",
    mobile_1: 88,
    mobile_2: 88,
    address: "",
    occapation: "",
    birthday: new Date()
    }

  ngOnInit(): void {
  }

  save() {
    this.store.dispatch(invokeSaveTeacherAPI({ payload: {...this.teacherForm} }));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({apiStatus: {apiStatus: '', apiResponseMessage: ''}}))
        this.router.navigate(['/'])
      }
    })
  }

}
