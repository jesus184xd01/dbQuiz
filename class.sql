CREATE DATABASE classes;
USE encuestas;
CREATE TABLE encuestas(
    id_encuesta BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NULL,
    date_current TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE preguntas(
    id_pregunta BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_encuesta BIGINT,
    id_competencia BIGINT,
    pregunta TEXT NULL,
    date_current TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_encuesta) REFERENCES encuestas(id_encuesta)
    FOREIGN KEY (id_competencia) REFERENCES competencias(id_competencia)
);

CREATE TABLE aplica(
    id_aplica BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    aplica_encuesta VARCHAR(30) NULL,
    date_current TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE competencias(
    id_competencia BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    competencia VARCHAR(30) NULL,
    status TINYINT NULL,
    date_current TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE respuestas(
    id_respuesta BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_encuesta BIGINT,
    id_encuestado BIGINT,
    valores TEXT,
    date_current TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE encuestados(
    id_encuestado BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NULL,
    apellido VARCHAR(30) NULL,
    email VARCHAR(50) NULL,
    date_current TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE nombres(
    id_nombre BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NULL,
    ap VARCHAR(30) NULL,
    am VARCHAR(30) NULL,
    date_current TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

competencias
preguntas
respuestas

/* Consultar del primer registro y de la primer pregunta el valor que tiene como reactivo */
SELECT * FROM encuestas, preguntas, persona where id_encuesta = 1 && id_pregunta = 1 && id_persona = 1 RESULT preguntas.valor

SELECT * FROM encuestas, preguntas where name = "Lider" AND pregunta_competencia == "Lider"