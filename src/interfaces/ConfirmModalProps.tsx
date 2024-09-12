export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmText:string;
    confirmDescription:string;
}