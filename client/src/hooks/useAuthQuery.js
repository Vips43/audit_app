import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useLogin = () => {

  return useMutation({
    mutationFn: async (creds) => {
      localStorage.removeItem("user");
      const { data } = await api.post("/auth/login", creds);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      
    },
    onError: (error) => {
      console.log("login failed", error);
      
    },
  });
};
