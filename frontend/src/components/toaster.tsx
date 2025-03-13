import { toast } from "react-hot-toast";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// success toast
export function successToast(message: string) {
  toast(
    <div className=" flex items-center">
      <FaCheckCircle className=" text-gray-500 mr-2" />
      <span>{message}</span>
    </div>,
    {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#4CAF50",
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        fontWeight: "bold",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1",
        fontSize: "16px",
      },
      icon: <FaCheckCircle className=" text-white" />,
    }
  );
}

// Error Toast
export function errorToast(message: string) {
  toast.error(
    <div className="flex items-center">
      <FaExclamationCircle className="text-red-500 mr-2" />
      <span>{message}</span>
    </div>,
    {
      duration: 3000,
      position: "top-center",
      style: {
        background: "#f44336",
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        fontWeight: "bold",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
      },
      icon: <FaExclamationCircle className="text-white" />,
    }
  );
}
