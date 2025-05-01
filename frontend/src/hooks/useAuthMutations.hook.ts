import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";

export function useLoginMutation() {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: ({ user, token }) => {
      login(user, token);
      toast.success("Login successful!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}

export function useRegisterMutation() {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: ({ user, token }) => {
      login(user, token);
      toast.success("Registration successful!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
