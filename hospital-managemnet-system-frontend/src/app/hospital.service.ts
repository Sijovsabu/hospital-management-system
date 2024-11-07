import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private apiUrl = 'http://localhost:3000/doctors';
  private apiUrlPatients = 'http://localhost:3000/patients';
  private apiUrlAppointments = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any> {
    return this.http.get(this.apiUrlAppointments);
  }

  addAppointments(appointment: any): Observable<any> {
    return this.http.post(this.apiUrlAppointments, appointment);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlAppointments}/${id}`);
  }

  getDoctors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addDoctors(doctor: any): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  deleteDoctors(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateDoctors(id: string, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  getPatients(): Observable<any> {
    return this.http.get(this.apiUrlPatients);
  }

  addPatients(patientData: FormData): Observable<any> {
    return this.http.post(this.apiUrlPatients, patientData);
  }

  updatePatients(id: string, patientData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrlPatients}/${id}`, patientData);
  }

  deletePatients(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlPatients}/${id}`);
  }
}
