import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../hospital.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
})
export class AppointmentsComponent implements OnInit {
  doctors: any[] = [];
  patients: any[] = [];
  appointments: any[] = [];
  isEditing = false;
  appointment: any = {};

  constructor(private hospitalService: HospitalService) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadPatients();
    this.loadAppointments();
  }

  loadDoctors() {
    this.hospitalService.getDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }

  loadPatients() {
    this.hospitalService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  loadAppointments() {
    this.hospitalService.getAppointments().subscribe((data) => {
      this.appointments = data;
      console.log(this.appointments);
    });
  }

  addAppointment() {
    const selectedPatient = this.patients.find(
      (patient) => patient._id === this.appointment.patientId
    );
    const selectedDoctor = this.doctors.find(
      (doctor) => doctor._id === this.appointment.doctorId
    );

    if (selectedPatient && selectedDoctor) {
      this.hospitalService
        .addAppointments({
          ...this.appointment,
          patientName: selectedPatient.name,
          doctorName: `${selectedDoctor.name} ${selectedDoctor.speciality}`,
        })
        .subscribe((response) => {
          this.loadAppointments(); // Reload appointments after adding
          this.resetForm(); // Clear form after adding
        });
    }
  }

  updateAppointment() {
    // Implement updating the appointment with similar logic to addAppointment
  }

  editAppointment(appointment: any) {
    this.isEditing = true;
    this.appointment = { ...appointment }; // Populate the form with the selected appointment's data
  }

  deleteAppointment(id: string) {
    this.hospitalService.deleteAppointment(id).subscribe(() => {
      this.loadAppointments(); // Reload appointments after deletion
    });
  }

  resetForm() {
    this.isEditing = false;
    this.appointment = {};
  }
}
