-- Create ENUM types
CREATE TYPE gender_type AS ENUM ('Laki-laki', 'Perempuan');
ALTER TYPE gender_type OWNER TO postgres;

CREATE TYPE marital_status_type AS ENUM ('Belum Menikah', 'Menikah', 'Cerai');
ALTER TYPE marital_status_type OWNER TO postgres;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles
(
    role_id   SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);
ALTER TABLE roles OWNER TO postgres;

-- Create employees table
CREATE TABLE IF NOT EXISTS employees
(
    employee_id         SERIAL PRIMARY KEY,

    identity_number     VARCHAR(50) NOT NULL UNIQUE,
    name                VARCHAR(100) NOT NULL,
    gender              gender_type NOT NULL,
    birth_place         VARCHAR(100) NOT NULL,
    birth_date          DATE NOT NULL,

    province            VARCHAR(100),
    city                VARCHAR(100),
    district            VARCHAR(100),
    village             VARCHAR(100),
    address_detail      TEXT,
    phone_number        VARCHAR(20),

    email               VARCHAR(100) NOT NULL UNIQUE,
    username            VARCHAR(50) NOT NULL UNIQUE,
    password_hash       VARCHAR(255) NOT NULL,

    contract_start_date DATE NOT NULL,
    contract_end_date   DATE NOT NULL,

    marital_status      marital_status_type,
    status        VARCHAR(20) NOT NULL DEFAULT 'Aktif',

    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE employees OWNER TO postgres;

-- Create junction table for many-to-many relation between employees and roles
CREATE TABLE IF NOT EXISTS employee_roles
(
    employee_id INTEGER NOT NULL
        REFERENCES employees(employee_id) ON DELETE CASCADE,
    role_id     INTEGER NOT NULL
        REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (employee_id, role_id)
);
ALTER TABLE employee_roles OWNER TO postgres;
