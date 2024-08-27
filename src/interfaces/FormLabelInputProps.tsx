interface FormLabelInputProps {
    text: string;
    placeholder: string;
    inputType:string;
    inputId:string;
    name:string;
    value:string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
  }