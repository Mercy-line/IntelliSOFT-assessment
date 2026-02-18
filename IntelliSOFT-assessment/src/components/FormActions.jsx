import React from "react";

const FormActions = ({
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  cancelType = "button",
}) => {
  return (
    <div className="flex justify-between mt-16">
      <button
        type={cancelType}
        onClick={onCancel}
        className="bg-gray-400 text-white px-10 py-4 rounded-lg hover:bg-gray-500 transition"
      >
        {cancelText}
      </button>

      <button
        type="submit"
        className="bg-blue-500 text-white px-10 py-4 rounded-lg hover:bg-blue-600 transition"
      >
        {submitText}
      </button>
    </div>
  );
};

export default FormActions;
