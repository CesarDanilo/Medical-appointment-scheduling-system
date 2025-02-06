```bash
  Users
  |-- id (PK)
  |-- name
  |-- email
  |-- password
  |-- role
  |-- created_at
  |-- updated_at
  
  Doctors
  |-- id (PK)
  |-- user_id (FK → Users)
  |-- specialty
  |-- bio
  |-- created_at
  |-- updated_at
  
  Patients
  |-- id (PK)
  |-- user_id (FK → Users)
  |-- date_of_birth
  |-- gender
  |-- created_at
  |-- updated_at
  
  Schedules
  |-- id (PK)
  |-- doctor_id (FK → Doctors)
  |-- start_time
  |-- end_time
  |-- is_available
  |-- created_at
  |-- updated_at
  
  Appointments
  |-- id (PK)
  |-- patient_id (FK → Patients)
  |-- schedule_id (FK → Schedules)
  |-- status
  |-- notes
  |-- created_at
  |-- updated_at
  
  AppointmentHistory
  |-- id (PK)
  |-- appointment_id (FK → Appointments)
  |-- diagnosis
  |-- prescription
  |-- created_at
  
  Reminders
  |-- id (PK)
  |-- appointment_id (FK → Appointments)
  |-- sent_at
  |-- reminder_type
  
  Payments (Opcional)
  |-- id (PK)
  |-- appointment_id (FK → Appointments)
  |-- amount
  |-- payment_method
  |-- status
  |-- created_at
  |-- updated_at
