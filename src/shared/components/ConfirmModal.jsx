import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", isLoading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-2">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-sm text-slate-500">{message}</p>
        
        <div className="flex items-center space-x-3 w-full pt-4 mt-4 border-t border-slate-100">
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 border-rose-600 hover:border-rose-700" onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
