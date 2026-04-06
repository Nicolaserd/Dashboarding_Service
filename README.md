# 📊 DataFlow Studio — Plataforma de Dashboarding Empresarial

> Plataforma B2B integral para gestión, diseño y entrega de dashboards interactivos. Conecta empresas cliente con elaboradores de datos especializados a través de un portal web moderno.

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Catálogo de Servicios](#-catálogo-de-servicios)
- [Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [Backend](#-backend)
  - [Entidades y Modelo de Datos](#entidades-y-modelo-de-datos)
  - [Relaciones entre Entidades](#relaciones-entre-entidades)
  - [API REST — Endpoints](#api-rest--endpoints)
  - [Roles y Permisos](#roles-y-permisos)
- [Frontend](#-frontend)
  - [Vistas y Módulos](#vistas-y-módulos)
  - [Componentes Principales](#componentes-principales)
  - [Flujo de Navegación](#flujo-de-navegación)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)

---

## 🌐 Descripción General

**DataFlow Studio** es una plataforma que conecta tres actores principales:

```
 ┌──────────────────┐     solicita servicio      ┌───────────────────┐
 │  EMPRESA CLIENTE │ ─────────────────────────▶ │     PROYECTO     │
 └──────────────────┘                            └────────┬──────────┘
                                                          │ asignado a
 ┌──────────────────┐     consume dashboard       ┌───────▼──────────┐
 │ USUARIO EMPRESA  │ ◀────────────────────────── │   ELABORADOR     │
 └──────────────────┘                            └──────────────────┘
```

- **Empresa:** contrata servicios y gestiona sus usuarios internos.
- **Elaborador:** profesional de datos que ejecuta el proyecto y entrega el dashboard.
- **Usuario Empresa:** persona dentro de la empresa que consume y visualiza los dashboards entregados.

---

## 📦 Catálogo de Servicios

### 1. 📊 Dashboards Empresariales
Tableros interactivos en tiempo real con KPIs clave del negocio.
- Filtros dinámicos, segmentación por fecha, región o producto
- Actualización automática de datos (tiempo real o por batches)
- Acceso multiusuario con vistas por rol
- **Herramientas:** Power BI, Tableau, Looker, Custom Web

### 2. ⚙️ Automatización de Reportes
Eliminación del trabajo manual en la generación de informes periódicos.
- Reportes en PDF, Excel o correo HTML generados automáticamente
- Programación por cron (diario, semanal, mensual)
- Envío automático a listas de distribución
- **Herramientas:** Python, Celery, Google Workspace, Outlook

### 3. 🔗 Integración de Fuentes de Datos
Unificación de múltiples sistemas en un único punto de verdad.
- Conectores para ERP, CRM, Google Analytics, redes sociales
- Diseño de pipelines ETL/ELT
- Normalización y modelado dimensional
- **Herramientas:** Airbyte, dbt, Apache Airflow, SQL

### 4. 🤖 Analítica Predictiva con IA
Modelos de machine learning aplicados al contexto del negocio.
- Forecasting de ventas, demanda e inventario
- Segmentación de clientes (clustering)
- Detección de anomalías y alertas inteligentes
- **Herramientas:** Python, scikit-learn, TensorFlow, MLflow

### 5. 🗄️ Data Warehouse & Lakehouse
Arquitectura de datos escalable en la nube.
- Esquemas estrella o copo de nieve
- Implementación en BigQuery, Snowflake, Redshift o AWS S3
- Capa semántica y métricas certificadas
- **Herramientas:** BigQuery, Snowflake, dbt, Terraform

### 6. 📱 Apps de Datos Personalizadas
Herramientas web internas adaptadas al flujo del cliente.
- Portales de seguimiento de proyectos o logística
- Calculadoras y simuladores de escenarios
- Dashboards embebidos en sistemas del cliente (iFrame, API)
- **Herramientas:** React, Streamlit, FastAPI, Next.js

### 7. 📋 Auditoría de Calidad de Datos
Diagnóstico del estado actual de los datos organizacionales.
- Detección de duplicados, nulos, inconsistencias y outliers
- Mapa de fuentes y linaje de datos
- Informe ejecutivo con plan de remediación
- **Herramientas:** Great Expectations, pandas, dbt tests

### 8. 🎓 Capacitación & Data Culture
Formación práctica para que los equipos aprovechen sus datos.
- Talleres de interpretación de dashboards (todos los niveles)
- Cursos de Power BI, SQL o Python básico
- Acompañamiento en adopción de herramientas
- **Formato:** Presencial, virtual, grabado

### 9. 🔔 Alertas & Monitoreo Continuo
Sistema de vigilancia de KPIs con notificaciones automáticas.
- Umbrales configurables por indicador
- Notificaciones por Slack, email o WhatsApp Business
- Log de eventos y auditoría de alertas disparadas
- **Herramientas:** Grafana, PagerDuty, webhooks custom

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                      │
│                                                                  │
│  ┌──────────────┐  ┌──────────────────┐  ┌───────────────────┐  │
│  │ Landing Page │  │  Portal Empresa  │  │ Panel Elaborador  │  │
│  └──────────────┘  └──────────────────┘  └───────────────────┘  │
└──────────────────────────────┬──────────────────────────────────┘
                               │ HTTPS / REST + JWT
┌──────────────────────────────▼──────────────────────────────────┐
│                    NGINX — API Gateway                           │
│              Rate limiting · SSL · Reverse Proxy                │
└──────────┬───────────────────────────────────────┬─────────────┘
           │                                       │
┌──────────▼──────────┐               ┌────────────▼────────────┐
│    AUTH SERVICE      │               │    CORE API (FastAPI)   │
│  JWT · OAuth2        │               │ Empresas · Proyectos    │
│  Roles · Sesiones    │               │ Dashboards · Alertas    │
└──────────┬──────────┘               └────────────┬────────────┘
           │                                       │
┌──────────▼───────────────────────────────────────▼────────────┐
│                       PostgreSQL 15                            │
│   usuarios · empresas · elaboradores · proyectos               │
│   dashboards · accesos · alertas · calificaciones              │
└────────────────────────────────────────────────────────────────┘
           │                    │                     │
    ┌──────▼──────┐   ┌─────────▼────────┐  ┌────────▼───────┐
    │    Redis    │   │  AWS S3 /        │  │    Celery      │
    │  Caché /    │   │  Cloudinary      │  │  Tareas async  │
    │  Sesiones   │   │  (archivos)      │  │  (reportes,    │
    └─────────────┘   └──────────────────┘  │   alertas)     │
                                            └────────────────┘
```

---

## 🗄️ Backend

### Entidades y Modelo de Datos

---

#### `usuarios`
Tabla base para todos los actores del sistema. El campo `tipo_usuario` determina el flujo de acceso.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `nombre` | VARCHAR(120) | Nombre completo |
| `email` | VARCHAR(255) UNIQUE | Correo electrónico (login) |
| `password_hash` | TEXT | Contraseña hasheada con bcrypt |
| `tipo_usuario` | ENUM | `admin` · `empresa` · `elaborador` |
| `telefono` | VARCHAR(20) | Número de contacto |
| `avatar_url` | TEXT | Foto de perfil almacenada en S3 |
| `activo` | BOOLEAN | Soft delete — false = cuenta desactivada |
| `email_verificado` | BOOLEAN | Confirmación de correo |
| `ultimo_login` | TIMESTAMP | Auditoría de acceso |
| `creado_en` | TIMESTAMP | Fecha de registro |
| `actualizado_en` | TIMESTAMP | Última modificación |

---

#### `empresas`
Clientes que contratan servicios en la plataforma.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `nombre` | VARCHAR(200) | Razón social o nombre comercial |
| `nit` | VARCHAR(30) UNIQUE | NIT o identificación tributaria |
| `sector` | VARCHAR(80) | Retail, salud, educación, manufactura… |
| `tamaño` | ENUM | `micro` · `pequeña` · `mediana` · `grande` |
| `pais` | VARCHAR(80) | País de operación |
| `ciudad` | VARCHAR(80) | Ciudad principal |
| `logo_url` | TEXT | Logo de la empresa almacenado en S3 |
| `sitio_web` | TEXT | URL corporativa |
| `plan_activo` | ENUM | `starter` · `business` · `enterprise` |
| `fecha_contrato` | DATE | Inicio del contrato vigente |
| `fecha_vencimiento` | DATE | Fin del contrato |
| `representante_nombre` | VARCHAR(120) | Nombre del contacto principal |
| `representante_email` | VARCHAR(255) | Email del representante legal |
| `notas_crm` | TEXT | Notas internas del equipo comercial |
| `creado_en` | TIMESTAMP | Fecha de registro |

---

#### `elaboradores`
Profesionales de datos que ejecutan y entregan los proyectos. Extiende `usuarios`.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `usuario_id` | UUID FK → usuarios | Relación con la cuenta de usuario base |
| `especialidad` | VARCHAR(100) | Ej: "BI & Visualización", "Data Engineering" |
| `nivel` | ENUM | `junior` · `mid` · `senior` · `lead` |
| `habilidades` | JSONB | Array de tecnologías dominadas |
| `portafolio_url` | TEXT | Enlace al portafolio externo |
| `linkedin_url` | TEXT | Perfil de LinkedIn |
| `tarifa_hora_usd` | NUMERIC(10,2) | Tarifa para proyectos por hora |
| `disponible` | BOOLEAN | Si acepta nuevos proyectos actualmente |
| `proyectos_completados` | INTEGER | Contador histórico de proyectos |
| `calificacion_promedio` | NUMERIC(3,2) | Promedio de ratings recibidos (1.00–5.00) |
| `biografia` | TEXT | Presentación profesional |
| `zona_horaria` | VARCHAR(50) | Ej: "America/Bogota" |
| `creado_en` | TIMESTAMP | Fecha de registro |

---

#### `usuario_empresa`
Tabla pivote que define qué personas pertenecen a cada empresa y con qué rol.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `usuario_id` | UUID FK → usuarios | Usuario del sistema |
| `empresa_id` | UUID FK → empresas | Empresa a la que pertenece |
| `rol_empresa` | ENUM | `admin_empresa` · `analista` · `visualizador` |
| `departamento` | VARCHAR(100) | Área dentro de la empresa |
| `activo` | BOOLEAN | Acceso activo a la plataforma |
| `invitado_en` | TIMESTAMP | Fecha de invitación |
| `invitado_por` | UUID FK → usuarios | Quién otorgó el acceso |

---

#### `catalogo_servicios`
Servicios ofrecidos por la plataforma (los 9 del catálogo).

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `nombre` | VARCHAR(150) | Nombre del servicio |
| `slug` | VARCHAR(100) UNIQUE | Identificador para URLs |
| `descripcion_corta` | TEXT | Resumen para tarjetas de la landing |
| `descripcion_larga` | TEXT | Descripción completa del servicio |
| `precio_base_usd` | NUMERIC(10,2) | Precio mínimo referencial |
| `duracion_estimada_dias` | INTEGER | Tiempo promedio de entrega en días |
| `icono` | VARCHAR(10) | Emoji representativo |
| `tags` | JSONB | Etiquetas de herramientas y tecnologías |
| `activo` | BOOLEAN | Visible en catálogo público |
| `orden_display` | INTEGER | Orden de aparición en la landing page |

---

#### `proyectos`
Instancia de trabajo entre una empresa y un elaborador.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `empresa_id` | UUID FK → empresas | Empresa contratante |
| `elaborador_id` | UUID FK → elaboradores | Elaborador asignado |
| `nombre` | VARCHAR(200) | Nombre del proyecto |
| `descripcion` | TEXT | Brief y alcance acordado |
| `estado` | ENUM | `borrador` · `activo` · `en_revision` · `completado` · `cancelado` |
| `prioridad` | ENUM | `baja` · `media` · `alta` · `critica` |
| `fecha_inicio` | DATE | Inicio oficial del proyecto |
| `fecha_entrega_estimada` | DATE | Fecha comprometida con el cliente |
| `fecha_entrega_real` | DATE | Fecha real de entrega |
| `presupuesto_usd` | NUMERIC(12,2) | Valor total acordado |
| `horas_estimadas` | INTEGER | Horas planificadas |
| `horas_trabajadas` | INTEGER | Horas reales registradas |
| `notas_cliente` | TEXT | Comentarios y observaciones del cliente |
| `notas_internas` | TEXT | Notas privadas del equipo DataFlow |
| `creado_en` | TIMESTAMP | Fecha de creación |
| `actualizado_en` | TIMESTAMP | Última modificación |

---

#### `servicio_proyecto`
Servicios específicos incluidos en cada proyecto con sus precios acordados.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `proyecto_id` | UUID FK → proyectos | Proyecto al que pertenece |
| `catalogo_servicio_id` | UUID FK → catalogo_servicios | Servicio del catálogo |
| `descripcion_especifica` | TEXT | Alcance específico negociado |
| `horas_estimadas` | INTEGER | Horas asignadas a este servicio |
| `precio_acordado_usd` | NUMERIC(10,2) | Precio negociado para este servicio |

---

#### `dashboards`
Entregables visuales producidos dentro de cada proyecto.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `proyecto_id` | UUID FK → proyectos | Proyecto al que pertenece |
| `nombre` | VARCHAR(200) | Nombre del dashboard |
| `descripcion` | TEXT | Descripción funcional |
| `url_acceso` | TEXT | URL del dashboard publicado |
| `url_embed` | TEXT | URL para embebido en iFrame |
| `tipo_herramienta` | ENUM | `power_bi` · `tableau` · `looker` · `custom_web` · `streamlit` · `metabase` |
| `version` | VARCHAR(20) | Versión actual, ej: "v2.1.0" |
| `estado` | ENUM | `desarrollo` · `revision` · `activo` · `deprecado` |
| `fuentes_datos` | JSONB | Lista de fuentes de datos conectadas |
| `frecuencia_actualizacion` | ENUM | `tiempo_real` · `horario` · `diario` · `manual` |
| `ultimo_refresh` | TIMESTAMP | Última actualización de datos |
| `thumbnail_url` | TEXT | Vista previa del dashboard almacenada en S3 |
| `creado_en` | TIMESTAMP | Fecha de creación |

---

#### `acceso_dashboard`
Control granular de quién puede ver cada dashboard dentro de una empresa.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `dashboard_id` | UUID FK → dashboards | Dashboard al que se da acceso |
| `usuario_id` | UUID FK → usuarios | Usuario con acceso |
| `nivel_acceso` | ENUM | `visualizador` · `comentarista` · `editor` |
| `otorgado_por` | UUID FK → usuarios | Quién otorgó el acceso |
| `otorgado_en` | TIMESTAMP | Fecha de otorgamiento |
| `expira_en` | TIMESTAMP | NULL = sin expiración |

---

#### `alertas`
Configuración de monitoreo automático de KPIs por dashboard.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `dashboard_id` | UUID FK → dashboards | Dashboard monitoreado |
| `creado_por` | UUID FK → usuarios | Quién configuró la alerta |
| `nombre` | VARCHAR(150) | Nombre descriptivo de la alerta |
| `kpi_monitoreado` | VARCHAR(100) | Indicador a vigilar |
| `condicion` | ENUM | `mayor_que` · `menor_que` · `igual_a` · `fuera_de_rango` |
| `umbral_valor` | NUMERIC | Valor que dispara la alerta |
| `canal_notificacion` | ENUM | `email` · `slack` · `whatsapp` · `webhook` |
| `destinatarios` | JSONB | Lista de emails o IDs de destino |
| `activa` | BOOLEAN | Estado de la alerta |
| `ultima_disparo` | TIMESTAMP | Última vez que se activó |
| `total_disparos` | INTEGER | Contador histórico |

---

#### `calificaciones`
Evaluación del cliente sobre el trabajo del elaborador al cerrar un proyecto.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | UUID PK | Identificador único |
| `proyecto_id` | UUID FK → proyectos | Proyecto evaluado |
| `elaborador_id` | UUID FK → elaboradores | Elaborador calificado |
| `evaluado_por` | UUID FK → usuarios | Usuario de empresa que califica |
| `puntaje` | INTEGER (1–5) | Calificación general |
| `puntaje_comunicacion` | INTEGER (1–5) | Dimensión: comunicación |
| `puntaje_calidad` | INTEGER (1–5) | Dimensión: calidad del entregable |
| `puntaje_tiempo` | INTEGER (1–5) | Dimensión: cumplimiento de plazos |
| `comentario` | TEXT | Reseña escrita |
| `publica` | BOOLEAN | Visible en portafolio del elaborador |
| `creado_en` | TIMESTAMP | Fecha de calificación |

---

### Relaciones entre Entidades

```
usuarios ──────────────────────── usuario_empresa ──────── empresas
   │                                                           │
   ├──── elaboradores                                          │
   │          │                                                │
   │          └──────────────────── proyectos ────────────────┘
   │                                    │
   │                    ┌───────────────┼───────────────┐
   │                    │               │               │
   │           servicio_proyecto   dashboards     calificaciones
   │           (catalogo FK)           │
   │                               ┌───┴────────────┐
   │                               │                │
   │                          acceso_dashboard    alertas
   │                          (usuarios FK)
   │
   └──── calificaciones ──── elaboradores
```

---

### API REST — Endpoints

#### Autenticación
```
POST   /api/auth/register               Registro de nuevo usuario
POST   /api/auth/login                  Login — devuelve access + refresh token
POST   /api/auth/refresh                Renovar access token
POST   /api/auth/logout                 Invalidar sesión
POST   /api/auth/forgot-password        Solicitar reseteo por email
POST   /api/auth/reset-password         Aplicar nueva contraseña
GET    /api/auth/verify-email/:token    Verificar correo electrónico
```

#### Empresas
```
GET    /api/empresas                    Listar todas las empresas (admin)
POST   /api/empresas                    Crear empresa
GET    /api/empresas/:id                Detalle de empresa
PUT    /api/empresas/:id                Actualizar empresa
DELETE /api/empresas/:id                Soft delete empresa
GET    /api/empresas/:id/usuarios       Usuarios de la empresa
POST   /api/empresas/:id/usuarios       Invitar usuario a empresa
DELETE /api/empresas/:id/usuarios/:uid  Remover usuario de empresa
```

#### Usuarios
```
GET    /api/usuarios                    Listar usuarios (admin)
GET    /api/usuarios/me                 Perfil propio autenticado
PUT    /api/usuarios/me                 Actualizar perfil propio
GET    /api/usuarios/:id                Perfil público de un usuario
DELETE /api/usuarios/:id                Desactivar usuario (admin)
```

#### Elaboradores
```
GET    /api/elaboradores                      Listar elaboradores disponibles
POST   /api/elaboradores                      Crear perfil de elaborador
GET    /api/elaboradores/:id                  Perfil del elaborador
PUT    /api/elaboradores/:id                  Actualizar perfil
PATCH  /api/elaboradores/:id/disponibilidad   Cambiar disponibilidad
GET    /api/elaboradores/:id/proyectos        Proyectos del elaborador
GET    /api/elaboradores/:id/calificaciones   Calificaciones recibidas
```

#### Proyectos
```
GET    /api/proyectos                         Listar (filtros: estado, empresa, elaborador)
POST   /api/proyectos                         Crear proyecto
GET    /api/proyectos/:id                     Detalle del proyecto
PUT    /api/proyectos/:id                     Actualizar proyecto
PATCH  /api/proyectos/:id/estado              Cambiar estado del proyecto
DELETE /api/proyectos/:id                     Cancelar proyecto
GET    /api/proyectos/:id/dashboards          Dashboards del proyecto
POST   /api/proyectos/:id/calificacion        Calificar proyecto cerrado
```

#### Catálogo de Servicios
```
GET    /api/servicios                         Listar servicios (público)
POST   /api/servicios                         Crear servicio (admin)
GET    /api/servicios/:id                     Detalle del servicio
PUT    /api/servicios/:id                     Actualizar servicio (admin)
PATCH  /api/servicios/:id/toggle              Activar / desactivar servicio
```

#### Dashboards
```
GET    /api/dashboards                        Listar dashboards del usuario autenticado
POST   /api/dashboards                        Crear dashboard
GET    /api/dashboards/:id                    Detalle del dashboard
PUT    /api/dashboards/:id                    Actualizar dashboard
DELETE /api/dashboards/:id                    Deprecar dashboard
POST   /api/dashboards/:id/acceso             Otorgar acceso a usuario
DELETE /api/dashboards/:id/acceso/:uid        Revocar acceso
```

#### Alertas
```
GET    /api/dashboards/:id/alertas            Alertas del dashboard
POST   /api/dashboards/:id/alertas            Crear alerta
PUT    /api/alertas/:id                       Actualizar alerta
DELETE /api/alertas/:id                       Eliminar alerta
PATCH  /api/alertas/:id/toggle                Activar / desactivar alerta
```

---

### Roles y Permisos

| Rol | Actor | Permisos principales |
|---|---|---|
| `admin` | Equipo DataFlow | Gestión global: empresas, elaboradores, proyectos, catálogo |
| `admin_empresa` | Representante de empresa | CRUD usuarios propios, ver todos sus proyectos y dashboards |
| `analista` | Empleado de empresa | Ver proyectos, interactuar con dashboards, crear alertas |
| `visualizador` | Usuario de consumo | Solo ver dashboards que le han sido asignados |
| `elaborador` | Profesional de datos | Gestionar sus proyectos asignados, subir y publicar dashboards |

---

## 🖥️ Frontend

### Vistas y Módulos

La aplicación frontend tiene cuatro portales diferenciados según el tipo de usuario.

---

#### 🌍 Portal Público (Landing Page)
Visible sin autenticación. Objetivo: convertir visitantes en clientes.

| Vista | Ruta | Descripción |
|---|---|---|
| Home / Landing | `/` | Hero, estadísticas, servicios, proceso, precios, contacto |
| Detalle Servicio | `/servicios/:slug` | Página individual de cada servicio del catálogo |
| Sobre Nosotros | `/nosotros` | Equipo, misión y clientes destacados |
| Contacto | `/contacto` | Formulario + canales de contacto (WhatsApp, email, Calendly) |
| Blog | `/blog` | Artículos y recursos de inteligencia de datos |
| Login | `/login` | Acceso a la plataforma |
| Registro | `/registro` | Creación de cuenta (empresa o elaborador) |

---

#### 🏢 Portal Empresa
Accesible para `admin_empresa`, `analista` y `visualizador`.

| Vista | Ruta | Descripción |
|---|---|---|
| Inicio | `/empresa/inicio` | Resumen: proyectos activos, dashboards recientes, alertas |
| Mis Proyectos | `/empresa/proyectos` | Lista de proyectos con estado, fechas y elaborador asignado |
| Detalle Proyecto | `/empresa/proyectos/:id` | Timeline, servicios incluidos, documentos, calificación |
| Mis Dashboards | `/empresa/dashboards` | Galería de dashboards entregados con acceso rápido |
| Ver Dashboard | `/empresa/dashboards/:id` | Visualización embebida + gestión de alertas propias |
| Alertas | `/empresa/alertas` | Panel de alertas activas e historial de disparos |
| Usuarios | `/empresa/usuarios` | Invitar, gestionar roles y desactivar usuarios internos |
| Perfil Empresa | `/empresa/perfil` | Datos de la empresa, plan activo, representante |
| Solicitar Servicio | `/empresa/solicitar` | Formulario para iniciar un nuevo proyecto |

---

#### 🛠️ Panel Elaborador
Accesible para usuarios con rol `elaborador`.

| Vista | Ruta | Descripción |
|---|---|---|
| Inicio | `/elaborador/inicio` | Resumen: proyectos activos, horas registradas, calificaciones |
| Mis Proyectos | `/elaborador/proyectos` | Lista de proyectos asignados con estado y prioridad |
| Detalle Proyecto | `/elaborador/proyectos/:id` | Brief del cliente, servicios incluidos, registro de horas |
| Mis Dashboards | `/elaborador/dashboards` | Dashboards creados y su estado de publicación |
| Subir Dashboard | `/elaborador/dashboards/nuevo` | Formulario para registrar y publicar un dashboard |
| Mis Calificaciones | `/elaborador/calificaciones` | Historial de reseñas recibidas por proyecto |
| Mi Perfil | `/elaborador/perfil` | Editar habilidades, bio, portafolio y disponibilidad |

---

#### ⚙️ Panel Administrador (equipo DataFlow)
Accesible solo para rol `admin`.

| Vista | Ruta | Descripción |
|---|---|---|
| Dashboard Admin | `/admin` | Métricas globales: ingresos, proyectos activos, usuarios |
| Gestión Empresas | `/admin/empresas` | CRUD de empresas cliente y sus contratos |
| Gestión Elaboradores | `/admin/elaboradores` | CRUD de elaboradores, asignación a proyectos |
| Gestión Proyectos | `/admin/proyectos` | Todos los proyectos con filtros y asignaciones |
| Catálogo Servicios | `/admin/servicios` | Crear, editar y activar/desactivar servicios |
| Gestión Usuarios | `/admin/usuarios` | Todos los usuarios del sistema |
| Reportes | `/admin/reportes` | Métricas de negocio: conversión, entregas, ingresos |

---

### Componentes Principales

```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx              Barra de navegación responsiva
│   │   ├── Footer.jsx              Pie de página con links y redes
│   │   ├── Button.jsx              Botón reutilizable (primary, secondary, ghost)
│   │   ├── Badge.jsx               Etiqueta de estado con color dinámico
│   │   ├── Modal.jsx               Modal genérico con overlay y animación
│   │   ├── Toast.jsx               Notificaciones tipo toast (éxito, error, info)
│   │   ├── Spinner.jsx             Indicador de carga
│   │   └── Avatar.jsx              Foto de perfil con fallback a iniciales
│   │
│   ├── landing/
│   │   ├── HeroSection.jsx         Sección principal con CTA y fondo animado
│   │   ├── ServicesGrid.jsx        Grid de 9 servicios con tarjetas interactivas
│   │   ├── ServiceCard.jsx         Tarjeta individual de servicio
│   │   ├── StatsBar.jsx            Barra de estadísticas con contadores animados
│   │   ├── ProcessSteps.jsx        Pasos numerados del proceso de trabajo
│   │   ├── PricingCards.jsx        Tarjetas de planes con listas de features
│   │   ├── ContactForm.jsx         Formulario con validación y toast de confirmación
│   │   └── DashboardPreview.jsx    Demo visual interactiva de un dashboard
│   │
│   ├── empresa/
│   │   ├── ProjectList.jsx         Lista de proyectos con filtros por estado
│   │   ├── ProjectCard.jsx         Tarjeta resumen de proyecto con badge de estado
│   │   ├── ProjectTimeline.jsx     Línea de tiempo del proyecto con hitos
│   │   ├── DashboardGallery.jsx    Galería de dashboards con thumbnail y acceso
│   │   ├── DashboardEmbed.jsx      Visualizador embebido via iFrame responsivo
│   │   ├── AlertPanel.jsx          Panel de alertas: crear, editar, ver historial
│   │   ├── UserTable.jsx           Tabla de usuarios con roles y acciones
│   │   └── ServiceRequest.jsx      Formulario de solicitud de nuevo servicio
│   │
│   ├── elaborador/
│   │   ├── ProjectKanban.jsx       Vista kanban de proyectos por estado
│   │   ├── HoursTracker.jsx        Registro diario de horas trabajadas por proyecto
│   │   ├── DashboardUpload.jsx     Formulario para registrar y publicar un dashboard
│   │   ├── RatingCard.jsx          Tarjeta de calificación recibida con detalle
│   │   └── SkillTags.jsx           Gestor de etiquetas de habilidades del perfil
│   │
│   └── admin/
│       ├── MetricCard.jsx          Tarjeta de métrica global con tendencia
│       ├── RevenueChart.jsx        Gráfico de ingresos por período (Recharts)
│       ├── EntityTable.jsx         Tabla genérica con CRUD y paginación
│       └── AssignElaborator.jsx    Modal de asignación elaborador a proyecto
│
├── pages/                          Una archivo por cada vista listada arriba
│
├── hooks/
│   ├── useAuth.js                  Contexto y helpers de autenticación JWT
│   ├── useProyectos.js             Fetch y mutaciones de proyectos (React Query)
│   ├── useDashboards.js            Fetch y mutaciones de dashboards
│   └── useAlertas.js               Gestión de alertas en tiempo real
│
├── services/
│   ├── api.js                      Instancia Axios con interceptores JWT + refresh
│   ├── auth.service.js             Login, logout, refresh token
│   ├── empresa.service.js          CRUD empresas y usuarios empresa
│   ├── proyecto.service.js         CRUD proyectos y servicios asociados
│   ├── dashboard.service.js        CRUD dashboards y gestión de accesos
│   └── alerta.service.js           CRUD alertas y configuración de webhooks
│
├── store/
│   ├── authSlice.js                Estado global de autenticación (Redux Toolkit)
│   ├── proyectosSlice.js           Cache y estado de proyectos
│   └── notificacionesSlice.js      Notificaciones en tiempo real
│
└── utils/
    ├── formatters.js               Formateo de fechas, monedas, estados
    ├── validators.js               Esquemas de validación de formularios (Zod)
    └── constants.js                Enums, colores de estado, rutas y labels
```

---

### Flujo de Navegación

```
Visitante anónimo
     │
     ├── Landing Page (/)
     │       └── Formulario contacto ──▶ Notificación al equipo DataFlow
     │
     └── /login
             │
             ├── tipo: admin
             │     └── Panel Admin (/admin)
             │           ├── Gestionar empresas, elaboradores, proyectos
             │           └── Ver reportes y métricas globales
             │
             ├── tipo: empresa  (admin_empresa / analista / visualizador)
             │     └── Portal Empresa (/empresa/inicio)
             │           ├── Ver y hacer seguimiento a proyectos
             │           ├── Consumir dashboards entregados
             │           ├── Configurar alertas de KPIs
             │           └── Gestionar usuarios del equipo
             │
             └── tipo: elaborador
                   └── Panel Elaborador (/elaborador/inicio)
                         ├── Ver proyectos asignados y registrar horas
                         ├── Subir y publicar dashboards
                         └── Ver calificaciones recibidas
```

---

## 🛠️ Stack Tecnológico

### Backend

| Capa | Tecnología |
|---|---|
| Lenguaje | Python 3.11+ |
| Framework API | FastAPI |
| ORM | SQLAlchemy + Alembic (migraciones) |
| Base de datos | PostgreSQL 15 |
| Autenticación | JWT (python-jose) + OAuth2 Password Flow |
| Caché / Sesiones | Redis |
| Tareas asíncronas | Celery + Redis como broker |
| Almacenamiento | AWS S3 / Cloudinary |
| Email | SendGrid |
| WhatsApp | Twilio WhatsApp Business API |
| Slack | Slack SDK (alertas) |
| Contenedores | Docker + Docker Compose |

### Frontend

| Capa | Tecnología |
|---|---|
| Framework | React 18 + Vite |
| Lenguaje | JavaScript (JSX) |
| Estilos | Tailwind CSS |
| Estado global | Redux Toolkit |
| Peticiones HTTP | Axios + React Query (TanStack Query) |
| Gráficos | Recharts / Chart.js |
| Formularios | React Hook Form + Zod |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Routing | React Router v6 |
| Testing | Vitest + React Testing Library |

---

## 📁 Estructura de Carpetas

```
dataflow-studio/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth.py
│   │   │       ├── empresas.py
│   │   │       ├── usuarios.py
│   │   │       ├── elaboradores.py
│   │   │       ├── proyectos.py
│   │   │       ├── dashboards.py
│   │   │       ├── servicios.py
│   │   │       └── alertas.py
│   │   ├── models/             ← Modelos SQLAlchemy (una clase por entidad)
│   │   ├── schemas/            ← Pydantic schemas (request / response DTOs)
│   │   ├── services/           ← Lógica de negocio desacoplada de los routers
│   │   ├── tasks/              ← Tareas Celery (reportes, alertas, emails)
│   │   └── core/
│   │       ├── config.py       ← Variables de entorno con pydantic-settings
│   │       ├── security.py     ← JWT, hashing bcrypt, OAuth2
│   │       └── database.py     ← Conexión y sesión PostgreSQL
│   ├── alembic/                ← Migraciones de base de datos
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/         ← Ver árbol de componentes arriba
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── docker-compose.yml
├── nginx.conf
└── README.md
```

---

## 🚀 Instalación

### Requisitos previos
- Python 3.11+
- Node.js 18+
- PostgreSQL 15
- Redis
- Docker (opcional pero recomendado)

### Con Docker

```bash
# Clonar el repositorio
git clone https://github.com/tu-org/dataflow-studio.git
cd dataflow-studio

# Copiar y editar variables de entorno
cp .env.example .env

# Levantar todos los servicios
docker-compose up --build
```

- API disponible en: `http://localhost:8000`
- Docs interactivos: `http://localhost:8000/docs`
- Frontend en: `http://localhost:3000`

### Sin Docker

```bash
# ── BACKEND ──────────────────────────────────────────
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head            # Aplicar migraciones
uvicorn app.main:app --reload --port 8000

# ── FRONTEND ─────────────────────────────────────────
cd frontend
npm install
npm run dev
```

---

## 🔐 Variables de Entorno

```env
# ── Base de datos ──────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/dataflow_db

# ── Seguridad ──────────────────────────────────
SECRET_KEY=tu_clave_secreta_muy_larga_y_aleatoria
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=30

# ── Redis ──────────────────────────────────────
REDIS_URL=redis://localhost:6379

# ── Almacenamiento ─────────────────────────────
AWS_ACCESS_KEY_ID=tu_key
AWS_SECRET_ACCESS_KEY=tu_secret
AWS_S3_BUCKET=dataflow-assets
AWS_REGION=us-east-1

# ── Email ──────────────────────────────────────
SENDGRID_API_KEY=SG.xxxxxxxx
FROM_EMAIL=hola@dataflowstudio.co

# ── WhatsApp / Twilio ──────────────────────────
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# ── Slack ──────────────────────────────────────
SLACK_BOT_TOKEN=xoxb-xxxxxxxx

# ── Frontend ───────────────────────────────────
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=DataFlow Studio
```

---

## 📄 Licencia

MIT License © 2025 DataFlow Studio — Colombia 🇨🇴
