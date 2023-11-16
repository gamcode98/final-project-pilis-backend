# FlicksSpot

## Video presentación

<video width="320" height="240" controls>
  <source src="https://drive.google.com/file/d/1RExxKKuQv5jkFTin27g0z2qe50g27klk/view" type="video/mp4">
  Tu navegador no soporta el elemento de video.
</video>

## Integrantes

| Nombres    | Apellidos    |
| ------------ | ------------ |
| Fabián Abel    | Sajama   |
| Gabriel Alejandro    | Mamani    |
| Micaela    | Zerpa    |
| Sebastian Rafael    | Rojas    |

## Alcance del sistema

[Alcance del sistema - draw.io](https://app.diagrams.net/#G1sdrcfy_VNAdn12RiUqKAnAHyBzrcOC2o)

## Diagrama de entidad relación

![diagrama de entidad relación](./der-flicksSpot.png)

## Instrucciones

- Instalar las dependencias

```bash
  npm i 
```

- Asignar las variables de entorno en el archivo **.env**

- Iniciar el contenedor de Docker

```bash
  docker compose up -d
```

- Ejecutar SEED:
  - Crea los roles, el usuario administrador y las salas.

```bash
  npm run db:seed
```

- Iniciar la aplicación:

```bash
  npm run dev
```

Nota:

1 - Se proporciona un script sql con datos para poder importar una base de datos de prueba

2 - Para poder utilizar la integración con Mercado Pago es necesario que el servidor local tenga una url segura (https), para ello se recomienda colocar en la variable de entorno **BACKEND_URL** y **BACKEND_BACK_URL** la url que nos proporciona el servicio de [ngrok](https://ngrok.com/), ademas para el uso de la aplicación mobile es necesario agregar a la variable de entorno **MOBILE_URL** la url que proporciona expo al iniciar la aplicación (ej: exp://192.1.68.1:8000) y en **FRONTEND_URL** utilizar la url de la aplicación web (ej: http://localhost:5173)
