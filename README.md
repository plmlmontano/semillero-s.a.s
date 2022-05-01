# Semillero S.A.S

El proyecto original junto con su historial de subidas (commits) esta alojado en [plmlmontano/semillero-sas]
## Proyecto Sprint 1 Backend
Plataforma para la empresa Semillero S.A.S donde podra tener un control de sus vehiculos en su poder.

### Problema
Actualmente, la empresa ***Semillero S.A.S*** quiere implementar una base de datos que le permita tener un control más preciso de los vehículos que tienen en la compañía, se desea guardar las diferentes marcas de vehículos que tiene la compañía, de estas marcas se quiere almacenar la descripción y si la marca está activa en la compañía. También cada marca puede tener 1 o muchas líneas de vehículos, de cada línea se quiere almacenar la descripción de la línea y si está activa. Por último, se quiere almacenar cada uno de los vehículos, para eso se quiere guardar el número de placa, el modelo, fecha de vencimiento seguro y fecha de vencimiento de la tecnomecánica, cada vehículo puede estar asociado a una línea, y una línea puede tener muchos vehículos. Todos los datos son importantes para la compañía así que todos deben ser guardados. 

### Requisitos 

#### Requisitos Front End (Maquetación)
Se debe crear una página web sencilla que tenga:
- Interfaz con formulario para crear el vehículo
- Interfaz con formulario para editar el vehículo
- Interfaz para listar los vehículos almacenados (Se le debe dar la opción desde esta interfaz de eliminar el vehículo y dirigirse a la interfaz de edición). Se recomienda que utilicen una tabla. 
- Los campos de los formularios deben ser obligatorios. 
- Se recomienda el uso de un marco de trabajo, por ejemplo, Bootstrap. 
- Se deben utilizar eventos, funciones, arrays, objetos y asincronismo. 
- Para el tema de las peticiones se recomienda utilizar fetch o axios. 
- Cada proceso de creación, edición, eliminación y obtención de datos se debe ver reflejado en la base de datos.

> En el siguiente enlace podras ingresar al codigo realizado en React [frontend]

> Link web https://web-semillero.herokuapp.com/
#### Requisitos Back End (express.js y BD)
- Se debe realizar el modelo entidad - relación del problema propuesto. 
    - Se deben de definir correctamente las entidades (Sólo los mencionados en el universo del discurso).
    - Se deben definir correctamente los atributos. 
    - Se debe evidenciar los tipos de atributos. 
    - Se debe evidenciar los tipos de entidad (débil, fuerte).
- Se debe realizar el modelo relacional
    - Se debe pasar el modelo e-r a Relacional
    - Se debe especificar las claves foráneas y primarias 
    - Tener en cuenta la simbología al realizar las relaciones.
- Realizar el script de creación de tablas
    - En el campo activo los valores posibles son S y N. Implementarlos como campos SET o ENUM.
- La base de datos debe estar en MySQL
- Se debe levantar un servidor con express.js
    - Se deben de realizar los siguientes servicios REST:
         - Crear vehiculo POST
        - Actualizar vehículo por identificador PUT o PATCH
        - Eliminar vehículo por identificador DELETE
        - Obtener todos los vehículos creados GET 
        - Un servicio que permita registrar una nueva marca
        - Un servicio que permita registrar una nueva línea
        - Un servicio que indique cuál es el modelo máximo almacenado y el mínimo. 
        - Un servicio que me permita consultar todos los vehículos por un rango de fechas sobre el campo FECHA_VEN_SEGURO.
        - Un servicio que me permita saber cuál es el modelo máximo almacenado y el mínimo.
        - Un servicio que me permita consultar todos los vehículos por un rango de modelos por el campo modelo.
        - Un servicio que me permita realizar una consulta única que tenga las siguientes columnas: NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA; traer todos los registros de la tabla donde almacenes los vehículos que se encuentren en el estado S en el campo activo de la tabla donde se almacene las líneas.
        - Un servicio que me permita sumar todos los modelos.
        - Un servicio que me permita promediar todos los modelos.
        - Un servicio que me permita realizar una única consulta para saber cuántos registros están activos e inactivos de la tabla donde se almacenan las líneas .
- Los datos de conexión a base de datos deben manejar como variables de entorno (.env)
- Se debe utilizar Router() para el manejo de rutas
> En el siguiente enlace podras ingresar al codigo realizado del [backend]

> Link API Rest https://api-semillero.herokuapp.com/api/index


## Construido
### Herramientas Tecnológicas
- Backend
  * Nodejs
  * Mysql2
  * Express
  * ES6+
- Frontend
  * React.js
  * Mui material
  * Sweet alert 2
  * axios
- Otras
  * Git
  * Heroku
  * Github
  * Postman
  * Digital Ocean

## Contribuyendo

Contribuya usando GitHub Flow. Cree una rama, agregue confirmaciones y abra una solicitud de extracción .

## Versionado
v1

## Autores
* **Lina María Montaño Ramírez** - *Backend Developer* - [@calypsobronte]


## Licencia
MIT License


[plmlmontano/semillero-sas]: https://github.com/plmlmontano/semillero-sas
[frontend]: frontend
[backend]: backend
[@calypsobronte]: https://github.com/calypsobronte