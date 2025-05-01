import { useAuthStore } from "@/store/auth.store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { initialize, isCheckingAuth } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initialize().finally(() => setReady(true));
  }, [initialize]);
  if (isCheckingAuth || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }
  return <>{children}</>;
};
