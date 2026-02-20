// components/Toast.jsx
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Toast({ open, isSuccess, message }) {
  if (!open) return null;

  return (
    <div className="w-full flex justify-end">

      <Alert severity={isSuccess ? "success" : "error"} className="w-1/4  ">
        <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}
