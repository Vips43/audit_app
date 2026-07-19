import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuthStore } from "../store/store";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser());
  const logout = useAuthStore((state) => state.logout());

  return useMutation({
    mutationFn: async (creds) => {
      logout();

      const { data } = await api.post("/auth/login", creds);
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.log("login failed", error);
    },
  });
};
