# Peruvian Wishes

A BackEnd aplication inspired by Rappi.

## Documentación Interna

### Flujo de Solución

1. Se construyó un Boilerplate para que pueda ser tomado como Template para futuros proyectos que utilizen un Template Engine, contiene la configuración Esencial para el Servidor.

2. Se configuró el Template Engine de `Handlebars` y también el directorio views, con los layouts y partials que implican.

3. Se configuró el ORM de `Prisma` a través de las Variables de Entorno y su archivo de Configuración.

4. Se instancia el PrismaClient como cliente y se exporta hacia los controladores.

### Curiosidades:

* En el .env se puede hacer uso de la Interpolación de Variables:

```bash
PROTOCOL=http
HOST=localhost
PORT=4000
COMPRESSED_URI=${PROTOCOL}://${HOST}:${PORT}
```

4. Se configuro el linter `ESLint` para mantener patrones de código estáticos y estandarizados.