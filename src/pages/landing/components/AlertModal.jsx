import React, { useState } from 'react';
import classNames from 'classnames';

const AlertModal = ({ isOpen, onConfirm ,onDecline}) => {
  return (
    <div
      className={classNames(
        'fixed inset-0 z-50 flex items-center justify-center',
        {
          'hidden': !isOpen,
        }
      )}
    >
      <div className="bg-white p-4 rounded shadow-lg">
        <p>Are you certain that you are over 18 years old?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => {
              onConfirm();
            }}
          >
            Continue
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => {
                onDecline();
              }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
