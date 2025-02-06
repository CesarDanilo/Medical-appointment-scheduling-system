## Relacionamentos entre Tabelas

### Users → Doctors / Patients:

Um usuário pode ser um médico ou um paciente, mas não ambos.

Relacionamento 1:1 entre Users e Doctors ou Patients.

### Doctors → Schedules:

Um médico pode ter vários horários disponíveis.

Relacionamento 1:N entre Doctors e Schedules.

### Patients → Appointments:

Um paciente pode agendar várias consultas.

Relacionamento 1:N entre Patients e Appointments.

### Schedules → Appointments:

Um horário pode estar associado a uma única consulta.

Relacionamento 1:1 entre Schedules e Appointments.

### Appointments → AppointmentHistory:

Uma consulta pode ter um histórico associado após ser concluída.

Relacionamento 1:1 entre Appointments e AppointmentHistory.

### Appointments → Reminders:

Uma consulta pode ter vários lembretes enviados.

Relacionamento 1:N entre Appointments e Reminders.

### Appointments → Payments (Opcional):

Uma consulta pode ter um pagamento associado.

Relacionamento 1:1 entre Appointments e Payments.