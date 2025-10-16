import React, { useState } from "react";
import Button from "../../Button";

const DeleteConfirmationPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    // alert("Item successfully deleted!"); // Replace with actual delete logic
    setShowConfirmation(false);
    // You would typically call an API here to perform the actual deletion
    // e.g., deleteItem(itemId).then(() => alert("Deleted!"));
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
               
            
  return (
    <>
      <Button
        onClick={handleDeleteClick}
          label={'  Delete Account'}
                  className="bg-black text-sm !w-fit px-6"
                  type="submit"
                //   isLoading={isSubmitting}
                //   disabled={isSubmitting}
       
      >
      
      </Button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this account
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirmationPage;
