import axios from "axios";

export default class BaseUrl {
    async getData(endpoint: string, params: any = {}) {
      try {
        const { data } = await axios<any>(`/api/${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: { ...params },
        });
  
        return data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    }

    async setData(endpoint: string, params: any = {}) {
        try {
          const response = await axios<any>(`/api/${endpoint}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: { ...params },
          });
    
          return response;
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
             return Promise.reject(error.response?.data);
          }
        }
      }
  
  }
  