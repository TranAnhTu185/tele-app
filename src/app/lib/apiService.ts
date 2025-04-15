import axiosInstance from './axios';

type Headers = Record<string, string>;

class ApiService {
  static async get<T>(url: string, headers?: Headers): Promise<T> {
    const res = await axiosInstance.get<T>(url, {
      headers: headers || {},
    });
    return res.data;
  }

  static async post<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>,
    headers?: Headers
  ): Promise<T> {
    const res = await axiosInstance.post<T>(url, data, {
      headers: headers || {},
    });
    return res.data;
  }
}

export default ApiService;