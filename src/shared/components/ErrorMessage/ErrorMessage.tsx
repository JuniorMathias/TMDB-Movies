import { Alert } from "@material-tailwind/react";
import { useState } from "react";

const ErrorMessage = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50"
      onClick={() => setVisible(false)}
    >
      <Alert className="bg-gray-200 text-gray-800 font-semibold text-center rounded-lg shadow-lg px-6 py-4 max-w-md">
        Sorry, something went wrong. Please try again.
      </Alert>
    </div>
  );
};

export default ErrorMessage;
