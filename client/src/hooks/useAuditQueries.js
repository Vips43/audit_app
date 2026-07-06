import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';


export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data } = await api.get('/questions');
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useSubmitAudit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (auditData) => {
      const { data } = await api.post('/audits', auditData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audits'] });
    },
  });
};