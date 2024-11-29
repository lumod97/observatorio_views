import axios, { AxiosInstance } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8080', // Configura tu base URL aquí
      timeout: 10000,                  // Tiempo de espera (en milisegundos)
      headers: {
        'Content-Type': 'application/json', // Configura encabezados predeterminados
        'Accept': 'application/json',
      },
    });

    // Interceptores de solicitud
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Agregar un token si es necesario
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptores de respuesta
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Manejar errores globales
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Método para realizar GET
  public get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.axiosInstance.get(url, { params }).then((response) => response.data);
  }

  // Método para realizar POST
  public post<T>(url: string, data: any): Promise<T> {
    return this.axiosInstance.post(url, data).then((response) => response.data);
  }

  // Método para realizar PUT
  public put<T>(url: string, data: any): Promise<T> {
    return this.axiosInstance.put(url, data).then((response) => response.data);
  }

  // Método para realizar DELETE
  public delete<T>(url: string): Promise<T> {
    return this.axiosInstance.delete(url).then((response) => response.data);
  }
}

export const apiService = new ApiService();
