import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctor = {
    name: '',
    speciality: '',
  };
  doctors: any[] = []; // Initialize an array to hold the list of doctors
  isEditing = false; // Track if the form is in editing mode
  currentDoctorId: string | null = null; // Store the ID of the doctor being edited

  constructor(
    private hospitalService: HospitalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDoctors(); // Fetch doctors on component initialization
  }

  getDoctors(): void {
    this.hospitalService.getDoctors().subscribe((response: any) => {
      this.doctors = response; // Store the list of doctors
    });
  }

  addDoctor(): void {
    this.hospitalService.addDoctors(this.doctor).subscribe((response: any) => {
      console.log('Doctor added', response);
      this.getDoctors(); // Fetch the updated list of doctors
      this.resetForm(); // Reset the form
    });
  }

  editDoctor(doctor: any): void {
    this.isEditing = true;
    this.currentDoctorId = doctor._id; // Store the ID of the doctor to edit
    this.doctor = { ...doctor }; // Prefill the form with doctor details
  }

  updateDoctor(): void {
    this.hospitalService
      .updateDoctors(this.currentDoctorId!, this.doctor)
      .subscribe((response: any) => {
        console.log('Doctor updated', response);
        this.getDoctors(); // Fetch the updated list of doctors
        this.resetForm(); // Reset the form
      });
  }

  deleteDoctor(id: string) {
    this.hospitalService.deleteDoctors(id).subscribe((response: any) => {
      console.log('Doctor deleted', response);
      this.doctors = this.doctors.filter((s) => s._id !== id);
    });
  }

  resetForm(): void {
    this.doctor = { name: '', speciality: '' }; // Reset the form data
    this.isEditing = false; // Set editing mode to false
    this.currentDoctorId = null; // Clear the current doctor ID
  }
}
