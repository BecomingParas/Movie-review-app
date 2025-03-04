import { toast } from "react-hot-toast";

export const errorToast = (message: string) => toast.error(message);
export const successToast = (message: string) => toast.success(message);
