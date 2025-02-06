## Usuários (Users)

Armazena informações de todos os usuários do sistema (pacientes, médicos e administradores).

    CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('paciente', 'médico', 'admin')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

## Médicos (Doctors)

Armazena informações específicas dos médicos.

    CREATE TABLE Doctors (
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
        specialty VARCHAR(100) NOT NULL,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

## Pacientes (Patients)

Armazena informações específicas dos pacientes.


    CREATE TABLE Patients (
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
        date_of_birth DATE,
        gender VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

## Agendas (Schedules) 

Armazena os horários disponíveis dos médicos.

    CREATE TABLE Schedules (
        id SERIAL PRIMARY KEY,
        doctor_id INT NOT NULL REFERENCES Doctors(id) ON DELETE CASCADE,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        is_available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

## Consultas (Appointments)

    CREATE TABLE Appointments (
        id SERIAL PRIMARY KEY,
        patient_id INT NOT NULL REFERENCES Patients(id) ON DELETE CASCADE,
        schedule_id INT NOT NULL REFERENCES Schedules(id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL CHECK (status IN ('agendada', 'cancelada', 'concluída')),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

## Histórico de Consultas (AppointmentHistory)

Armazena o histórico de consultas concluídas.

    CREATE TABLE AppointmentHistory (
        id SERIAL PRIMARY KEY,
        appointment_id INT NOT NULL REFERENCES Appointments(id) ON DELETE CASCADE,
        diagnosis TEXT,
        prescription TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

## Lembretes (Reminders)

Armazena os lembretes enviados aos pacientes.

    CREATE TABLE Reminders (
        id SERIAL PRIMARY KEY,
        appointment_id INT NOT NULL REFERENCES Appointments(id) ON DELETE CASCADE,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reminder_type VARCHAR(50) NOT NULL CHECK (reminder_type IN ('email', 'sms'))
    );

## Pagamentos (Payments) (Opcional)

Armazena informações de pagamentos relacionados às consultas.

    CREATE TABLE Payments (
        id SERIAL PRIMARY KEY,
        appointment_id INT NOT NULL REFERENCES Appointments(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (status IN ('pendente', 'pago', 'cancelado')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


