export interface Teacher {
    id: number,
    name: string,
    email: string,
    mobile_1: number,
    mobile_2: number,
    address: string,
    occapation: string,
    birthday: Date
}

export interface TeacherState {
    teachers: Teacher[]
}