-- creacion de base de datos
CREATE DATABASE semilleros;

-- uso de la base de datos
USE semilleros;

-- marca
CREATE TABLE marca (
  id INT PRIMARY KEY auto_increment NOT NULL,
  descripcion VARCHAR(45) DEFAULT NULL,
  estado BOOLEAN NOT NULL, -- estado de la marca creada
  date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- fecha de creacion del registro
  date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- fecha de actualizacion del registro
);

DESCRIBE marca;

INSERT INTO marca (descripcion, estado,  date_create, date_update)
VALUES('BMW', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
SELECT * FROM marca;


-- linea
CREATE TABLE linea (
  id INT PRIMARY KEY auto_increment NOT NULL,
  id_marca INT DEFAULT NULL,
  descripcion VARCHAR(45) DEFAULT NULL,
  CONSTRAINT fk_id_marca FOREIGN KEY (id_marca) REFERENCES marca(id),
  estado BOOLEAN NOT NULL, -- estado de la linea creada
  date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- fecha de creacion del registro
  date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- fecha de actualizacion del registro
);

DESCRIBE linea;

INSERT INTO linea (id_marca, descripcion, estado,  date_create, date_update)
VALUES(1, 'Todoterreno', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
SELECT * FROM linea;

-- vehiculo
CREATE TABLE vehiculos (
  nro_placa VARCHAR(7) PRIMARY KEY NOT NULL UNIQUE NOT NULL,
  id_linea INT DEFAULT NULL,
  color VARCHAR(45) DEFAULT NULL,
  modelo ENUM('2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021', '2022', '2023', '2024') NULL,
  fecha_vencimiento_seguro TIMESTAMP NOT NULL,
  fecha_vencimiento_tecnomecanica TIMESTAMP NOT NULL,
  CONSTRAINT fk_id_linea FOREIGN KEY (id_linea) REFERENCES linea(id),
  estado BOOLEAN NOT NULL, -- estado del vehiculo creado
  date_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- fecha de creacion del registro
  date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- fecha de actualizacion del registro
);

DESCRIBE vehiculos;

INSERT INTO vehiculos VALUES 
  ('LMM992', 1, 'Verde', '2002', '2021-04-23 00:00:00', '2021-12-23 00:00:00',	1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
SELECT * FROM vehiculos;


-- Ingreso de data
INSERT INTO marca  (descripcion, estado, date_create, date_update) VALUES
('Renault', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mazda', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Toyota', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Honda', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO linea (id_marca, descripcion, estado, date_create, date_update) VALUES
(2, 'Descapotable', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Deportivo', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Familiar', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Compacto', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Dos puertas', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Subcompacto', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Matrix', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

# Marca
-- Consulta de vehiculos con id de marca y id de linea con LEFT JOIN
SELECT a.nro_placa, c.descripcion marca, b.descripcion linea, a.color, a.modelo, DATE_FORMAT(a.fecha_vencimiento_seguro, '%d/%m/%Y') 'Fecha de vencimiento seguro', DATE_FORMAT(a.fecha_vencimiento_tecnomecanica, '%d/%m/%Y') 'Fecha de vencimiento tecnomecanica', IF(a.estado, 'Si', 'No') 'Estado'
FROM vehiculos a
LEFT JOIN linea b ON a.id_linea = b.id
LEFT JOIN marca c ON b.id_marca = c.id;

-- Consulta de vehiculos con id de marca y id de linea con INNER JOIN
SELECT a.nro_placa, c.descripcion marca, b.descripcion linea, a.color, a.modelo, DATE_FORMAT(a.fecha_vencimiento_seguro, '%d/%m/%Y') 'Fecha de vencimiento seguro', DATE_FORMAT(a.fecha_vencimiento_tecnomecanica, '%d/%m/%Y') 'Fecha de vencimiento tecnomecanica', IF(a.estado, 'Si', 'No') 'Estado'
FROM vehiculos a
INNER JOIN linea b ON a.id_linea = b.id
INNER JOIN marca c ON b.id_marca = c.id;

SELECT * FROM marca;

SELECT a.id, b.descripcion Marca, a.descripcion, a.estado
FROM linea a
LEFT JOIN marca b ON a.id_marca = b.id;

# Modelos
-- Un servicio que me permita saber cuál es el modelo máximo almacenado y el mínimo.
SELECT MAX(modelo) AS 'Modelo maximo', MIN(modelo) AS 'modelo minimo' FROM vehiculos;
-- Un servicio que me permita consultar todos los vehículos por un rango de modelos por el campo modelo.
SELECT * FROM vehiculos WHERE modelo >= '2000' AND modelo <= '2024';
SELECT * FROM vehiculos WHERE modelo BETWEEN '2000' AND '2009';
-- Suma de los modelos 
SELECT SUM(modelo) from vehiculos;
-- Promedio de los modelos 
SELECT AVG(modelo) FROM vehiculos;

# Lineas
-- Un servicio que me permita realizar una única consulta para saber cuántos registros están activos e inactivos de la tabla donde se almacenan las líneas .
-- Estado = SI
SELECT * FROM linea a
INNER JOIN vehiculos b ON b.id_linea = a.id
WHERE a.estado = TRUE;
-- Estado = NO
SELECT * FROM linea a
INNER JOIN vehiculos b ON b.id_linea = a.id
WHERE a.estado = FALSE;
-- Mostrar cuantas lineas estan en estado activa o inactivas
SELECT COUNT(*) FROM linea WHERE estado = TRUE;
SELECT COUNT(*) FROM linea WHERE estado = FALSE; -- colocar una en estado inactivo

# Vehiculos
-- Ver todos los vehiculos
SELECT * FROM vehiculos;
-- Contar todos los registros de los vehiculos
SELECT COUNT(*) FROM vehiculos;
-- Mostrar el registro de un vehiculo por su numero de placa
SELECT * FROM vehiculos WHERE nro_placa = 'LMM992';
-- Un servicio que me permita consultar todos los vehículos por un rango de fechas sobre el campo FECHA_VEN_SEGURO.
SELECT * FROM vehiculos WHERE fecha_vencimiento_seguro BETWEEN '2020-10-09' AND '2021-04-23';
-- Un servicio que me permita realizar una consulta única que tenga las siguientes columnas: NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA; traer todos los registros de la tabla donde almacenes los vehículos que se encuentren en el estado S en el campo activo de la tabla donde se almacene las líneas.
SELECT nro_placa, modelo, b.descripcion 'Marca', c.descripcion 'Linea', IF(c.estado, 'Si','No') 'Estado de linea', IF(b.estado, 'Si', 'No') 'Estado de marca'
FROM vehiculos a, marca b, linea c
WHERE b.id=c.id_marca AND c.id=a.id_linea AND c.estado=TRUE AND b.estado=TRUE;

# Script creado por Lina María Montaño Ramirez - Backend Developer
