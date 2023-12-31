import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  userType: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    const postData = this.signInForm.value;

    if (this.userType === 'Doctor') {
      this.apiService.doctorSignIn(postData).subscribe(
        (response: any) => {
          console.log('Doctor Login:', response);
          if (response && response.status === 200 && response.data && response.data.DoctorID) {
            console.log('PatientID:', response.data.DoctorID);
            // Redirect to the PatientHomeComponent with PatientID in the URL
            this.router.navigate(['/UserDoctor', response.data.DoctorID]);
          } else {
            console.error('Invalid response structure or missing DoctorID');
            // Handle the case when PatientID is missing or the response structure is invalid
            // For example, redirect to a generic error page or display an error message to the user
          }
        },
        (error: any) => {
          console.error('Doctor Login Error:', error);
          this.errorMessage = error.error.error;
        }
      );
    } else if (this.userType === 'Patient') {
      this.apiService.patientSignIn(postData).subscribe(
        (response: any) => {
          console.log('Patient Login:', response);
          if (response && response.status === 200 && response.data && response.data.PatientID) {
            console.log('PatientID:', response.data.PatientID);
            // Redirect to the PatientHomeComponent with PatientID in the URL
            this.router.navigate(['/UserPatient', response.data.PatientID]);
          } else {
            console.error('Invalid response structure or missing PatientID');
            // Handle the case when PatientID is missing or the response structure is invalid
            // For example, redirect to a generic error page or display an error message to the user
          }
        },
        (error: any) => {
          console.error('Patient Login Error:', error);
          this.errorMessage = error.error.error;
          // Handle error scenario, such as displaying an error message to the user
        }
      );
    }
    
  }

  setUserType(userType: string): void {
    this.userType = userType;
  }
}
