import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiData } from './api';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl ;

  constructor(private http: HttpClient) {}
  

  doctorSignIn(data: any): Observable<any> {
    console.log("hello worlddd");
    console.log(ApiData.baseUrl);
    return this.http.post(`${ApiData.baseUrl}api/DoctorSignIn`, data);
  }

  doctorSignUp(data: any): Observable<any> {
    return this.http.post(`${ApiData.baseUrl}api/DoctorSignUp`, data);
  }

  


  patientSignUp(data: any): Observable<any> {
    return this.http.post(`${ApiData.baseUrl}api/PatientSignUp`, data);
  }

  patientSignIn(data: any): Observable<any> {
    return this.http.post(`${ApiData.baseUrl}api/PatientSignIn`,  data);
  }

  showAllDoctors(): Observable<any> {
    return this.http.get(`${ApiData.baseUrl}api/PatientShowAllDoctors`);
  }

  showDoctorSlots(doctorID: number): Observable<any> {
    return this.http.get(`${ApiData.baseUrl}api/PatientShowDoctorSlots`, { params: { DoctorID: doctorID.toString() } });
  }

  reserveSlot(patientID: string, data: any): Observable<any> {
  
    return this.http.put(`${ApiData.baseUrl}api/PatientReserveSlot/${patientID}`, data);
}

  

  updateAppointment(patientID: string, data: any) {
    return this.http.put(`${ApiData.baseUrl}api/PatientUpdateAppointment/${patientID}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  setDoctorSchedule(doctorID: string, slotDateTime: string): Observable<any> {
    const url = `${ApiData.baseUrl}api/DoctorSetSchedule/${doctorID}`;
  
    const requestBody = { slotDateTime };
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.post(url, requestBody, { headers });
  }
  

  cancelAppointment(patientID: string, slotID: number): Observable<any> {
    const url = `${ApiData.baseUrl}api/PatientCancelAppointment/${patientID}`;
    const params = new HttpParams().set('slotId', slotID.toString());
  
    return this.http.delete(url, { params });
  }
  
  

  showPatientAppointments(patientID: string): Observable<any> {
    return this.http.get(`${ApiData.baseUrl}api/PatientShowAppointments/${patientID}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
}
