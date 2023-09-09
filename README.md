# FlicksSpot

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

Para poder utilizar la integración con Mercado Pago es necesario que el servidor local tenga una url segura (https), para ello se recomienda colocar en la variable de entorno **BACKEND_URL=** la url que nos proporciona el servicio de [ngrok](https://ngrok.com/)
