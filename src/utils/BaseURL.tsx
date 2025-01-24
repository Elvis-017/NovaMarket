import axios from "axios";

export default class BaseUrl {
    async getData(endpoint: string, params: any = {}) {
      try {
        const { data } = await axios<any>(`/api/${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${getCookieByName("token")}` 
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
              // "Authorization": `Bearer ${getCookieByName("token")}` 
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
  
    // async getData<T = any>(endpoint: string, params: any = {}, config: AxiosRequestConfig = {}) {
    //   try {      
    //     const { data } = await axios<T>(`/api/${endpoint}`, {...config,
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${getCookieByName("token")}`
    //       },
    //       params: { ...params },
    //     });
      
    //     return data;
    //   } catch (error: any) {
    //     if (axios.isAxiosError(error)) {
    //       return error.message;
    //     }
    //   }
    // }
  
    // async setData<T = any, U = any>(endpoint: string, params?: U, config: AxiosRequestConfig = {}) {
  
    //   try {
        
    //     const response = await axios<T>(`/api/${endpoint}`, {...config,
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${getCookieByName("token")}`
    //       },
    //       data: Array.isArray(params) ? params : { ...params }
    //     })
    //     return response;
    //   } catch (error: any) {
    //     if (axios.isAxiosError(error)) {
    //       return error.response?.data;
    //     }
    //   }
    // }
  
    // async authentication(endpoint: string, credentials: any = {}, config : AxiosRequestConfig = {}) {
    //   try {
    //     const { data, status } = await axios<any>(`/api/${endpoint}`, {...config,
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //       },
    //       data: { ...credentials },
    //     });
    //     return { data, status };
    //   } catch (error: any) {
    //     if (axios.isAxiosError(error)) {
    //       const err = error.response?.data;
    //       return err;
  
    //     }
    //   }
    // }
  }
  