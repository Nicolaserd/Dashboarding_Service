// Enums
export type TipoUsuario = 'admin' | 'empresa' | 'elaborador' | 'visualizador';
export type EstadoProyecto = 'cotizacion' | 'aprobado' | 'en_progreso' | 'en_revision' | 'entregado' | 'cancelado';
export type PrioridadProyecto = 'baja' | 'media' | 'alta' | 'critica';
export type TipoHerramienta = 'power_bi' | 'tableau' | 'looker' | 'custom_web' | 'metabase' | 'grafana';
export type NivelAcceso = 'visualizador' | 'comentarista' | 'editor';
export type CanalNotificacion = 'email' | 'slack' | 'whatsapp';

// Entidades principales
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  tipo_usuario: TipoUsuario;
  telefono?: string;
  avatar_url?: string;
  activo: boolean;
  email_verificado: boolean;
  ultimo_login?: string;
  created_at: string;
}

export interface Empresa {
  id: number;
  nombre: string;
  nit: string;
  sector?: string;
  tamano?: string;
  plan_activo?: string;
  fecha_contrato?: string;
  representante_email?: string;
  created_at: string;
}

export interface Elaborador {
  id: number;
  usuario_id: number;
  usuario?: Usuario;
  especialidad?: string;
  nivel?: string;
  habilidades?: string[];
  tarifa_hora_usd?: number;
  disponible: boolean;
  calificacion_promedio: number;
}

export interface Proyecto {
  id: number;
  empresa_id: number;
  empresa?: Empresa;
  elaborador_id?: number;
  elaborador?: Elaborador;
  nombre: string;
  descripcion?: string;
  estado: EstadoProyecto;
  prioridad: PrioridadProyecto;
  fecha_inicio?: string;
  fecha_entrega_estimada?: string;
  fecha_entrega_real?: string;
  presupuesto_usd?: number;
  horas_trabajadas: number;
  created_at: string;
}

export interface Dashboard {
  id: number;
  proyecto_id: number;
  proyecto?: Proyecto;
  nombre: string;
  descripcion?: string;
  tipo_herramienta: TipoHerramienta;
  url_acceso?: string;
  url_embed?: string;
  frecuencia_actualizacion?: string;
  activo: boolean;
  created_at: string;
}

export interface Alerta {
  id: number;
  dashboard_id: number;
  dashboard?: Dashboard;
  nombre: string;
  kpi_monitoreado: string;
  condicion: string;
  valor_umbral: number;
  canal_notificacion: CanalNotificacion;
  activa: boolean;
  created_at: string;
}

export interface CatalogoServicio {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;
  precio_base_usd?: number;
  duracion_estimada_dias?: number;
  tags?: string[];
  activo: boolean;
}

// Respuestas de API
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}
