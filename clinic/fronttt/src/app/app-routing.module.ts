import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { SignUpComponent } from './Signup/sign-up.component';
//import { PatientHomeComponent } from './PatientHome/patient-home.component';
//import { DoctorHomeComponent } from './DoctorHome/doctor-home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  //{ path: 'UserPatient/:id', component: PatientHomeComponent },
  //{ path: 'UserDoctor/:id', component: DoctorHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}