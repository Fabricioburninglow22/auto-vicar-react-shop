
import { 
  type ToastProps,
  type ToastActionElement,
  useToast as useToastOriginal,
  toast as toastOriginal
} from "@/components/ui/toast";

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

export const useToast = useToastOriginal;
export const toast = toastOriginal;

export type { ToastProps };
