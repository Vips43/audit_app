import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';

// Fetch all active question lists from backend
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

// Post the completed audit submission
export const useSubmitAudit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (auditData) => {
      const { data } = await api.post('/audits', auditData);
      return data;
    },
    onSuccess: () => {
      // Refresh key indicators or list boards once saved
      queryClient.invalidateQueries({ queryKey: ['audits'] });
    },
  });
};