import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Teacher } from '../store/teacher';
import { invokeUpdateTeacherAPI } from '../store/teachers.action';
import { selectTeacherById } from '../store/teachers.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private store: Store,
    private route:ActivatedRoute,
    private router:Router,
    private appStore:Store<Appstate>
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
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectTeacherById(id)));
      })
    );

    fetchFormData$.subscribe((data) => {
      if(data) {
        this.teacherForm = { ...data };
      } else {
        this.router.navigate(['/'])
      }
    });
    
  }

  update(){
    this.store.dispatch(invokeUpdateTeacherAPI({payload: {...this.teacherForm}}))

    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({apiStatus: {apiStatus: '', apiResponseMessage: ''}}))
        this.router.navigate(['/'])
      }
    })
  }

}
