import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteConfirm: () => Promise<void>;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ deleteDialogOpen, setDeleteDialogOpen, handleDeleteConfirm }) => {
  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border border-white/10 w-[90vw] max-w-md mx-auto shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02] pointer-events-none rounded-lg" />
        <AlertDialogHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 flex items-center justify-center border border-red-500/20 shadow-lg shadow-red-500/10">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <AlertDialogTitle className="text-gray-100 text-lg font-semibold">
              Confirm Project Deletion
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-400 pl-[52px]">
            Are you sure you want to delete this project? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="relative z-10 flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 mt-4">
          <AlertDialogCancel className="bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20 w-full sm:w-auto transition-all duration-200 rounded-xl">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 w-full sm:w-auto transition-all duration-200 shadow-lg shadow-red-500/25 rounded-xl font-semibold"
            onClick={handleDeleteConfirm}
          >
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};


