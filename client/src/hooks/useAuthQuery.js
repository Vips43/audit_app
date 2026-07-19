import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuthStore } from "../store/store";

export const useLogin = () => {
  
  return useMutation({
    mutationFn: async (creds) => {
      useAuthStore.getState().logout();

      const { data } = await api.post("/auth/login", creds);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      useAuthStore.getState().setUser(data);
    },
    onError: (error) => {
      console.log("login failed", error);
    },
  });
};
