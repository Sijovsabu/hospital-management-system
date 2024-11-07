import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patient = { name: '', age: null, gender: '' };
  alertMessage: string | null = null;
  patients: any[] = [];
  isEditing = false;
  currentPatientId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private hospitalService: HospitalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getPatients(): void {
    this.hospitalService.getPatients().subscribe((response: any) => {
      this.patients = response;
    });
  }

  addPatient(): void {
    const formData = new FormData();
    formData.append('name', this.patient.name);
    formData.append('gender', this.patient.gender);

    // Use Nullish Coalescing Operator
    formData.append('age', (this.patient.age ?? 0).toString());

    // For image file
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }

    this.hospitalService.addPatients(formData).subscribe((response: any) => {
      console.log('Patient added', response);
      this.alertMessage = 'Patient added successfully!';
      this.getPatients();
      this.resetForm();
      this.autoDismissAlert();
    });
  }

  editPatient(patient: any): void {
    this.isEditing = true;
    this.currentPatientId = patient._id;
    this.patient = { ...patient };
  }

  updatePatient(): void {
    const formData = new FormData();
    formData.append('name', this.patient.name);
    formData.append('age', (this.patient.age ?? 0).toString());
    formData.append('gender', this.patient.gender);
    if (this.selectedFile) formData.append('photo', this.selectedFile);

    this.hospitalService
      .updatePatients(this.currentPatientId!, formData)
      .subscribe((response: any) => {
        this.alertMessage = 'Patient updated successfully!';
        this.getPatients();
        this.resetForm();
        this.autoDismissAlert();
      });
  }

  deletePatient(id: string) {
    this.hospitalService.deletePatients(id).subscribe((response: any) => {
      this.alertMessage = 'Patient deleted successfully!';
      this.patients = this.patients.filter((s) => s._id !== id);
      this.autoDismissAlert();
    });
  }

  resetForm(): void {
    this.patient = { name: '', age: null, gender: '' };
    this.isEditing = false;
    this.currentPatientId = null;
    this.selectedFile = null;
  }

  autoDismissAlert() {
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  }
}
