import toast from "react-hot-toast";

export function showToast(type: string, message: string) {
  const duration = 2000;
  const position = "bottom-left";

  switch (type) {
    case "error":
      toast.error(`${message}`, {
        duration,
        position,
      });

      break;
    case "success":
      toast.success(`${message}`, {
        duration,
        position,
      });

      break;
  }
}
