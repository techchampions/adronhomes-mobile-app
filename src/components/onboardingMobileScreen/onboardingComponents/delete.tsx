import React, { useState } from "react";
import Button from "../../Button"; // Assuming this is your custom Button component

const DeleteConfirmationPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      // Replace with actual delete logic, e.g., an API call
      // const response = await deleteItem(itemId);
      // if (response.success) {
      setShowSuccessMessage(true);
      // } else {
      //   // Handle error
      //   alert("Error deleting item.");
      // }
    } catch (error) {
      console.error("Error during deletion:", error);
      // Handle error, e.g., display an error message
      // alert("An error occurred during deletion.");
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
      // Optionally hide success message after a few seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button
        onClick={handleDeleteClick}
        label={"Delete Account"}
        className="bg-black text-sm !w-fit px-6"
        type="button" // Change to "button" to prevent form submission if not intended
        isLoading={isLoading}
        disabled={isLoading}
      />

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className={`px-4 py-2 rounded-full font-medium transition duration-200 ${
                  isLoading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4 text-center">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Deletion Successful!
            </h2>
            <p className="text-gray-700 mb-6">
              Your account deletion request has been submitted and is currently
              being processed.
            </p>
            {/* Optional: Add a button to close the message sooner */}
            {/* <button
              onClick={() => setShowSuccessMessage(false)}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-200"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmationPage;
