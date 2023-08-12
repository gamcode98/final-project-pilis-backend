# Cinema system

## Diagrama de entidad relación

![diagrama de entidad relación](./der-cinema-system.png)

## Instrucciones

- Instalar las dependencias

```bash
  npm i 
```

- Iniciar el contenedor de Docker

```bash
  docker compose up -d
```

- Asignar las variables de entorno en el archivo **.env**

- Ejecutar SEED:
  - Crea los roles y el usuario administrador

```bash
  npm run db:seed
```

- Iniciar la aplicación:

```bash
  npm run dev
```
