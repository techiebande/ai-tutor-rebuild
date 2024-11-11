import React, {
  useState,
  FocusEvent,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FlyingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

// Forward the ref to the Input element
const FlyingLabelInput = forwardRef<HTMLInputElement, FlyingLabelInputProps>(
  ({ label, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value !== "");
    };

    useEffect(() => {
      setHasValue((props.value as string) !== "");
    }, [props.value]);

    return (
      <div className="relative">
        <Input
          ref={ref} // Make sure the ref is passed here
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="peer pt-6"
          {...props} // Allow all other props like `value`, `onChange`, etc. to pass through
        />
        <Label
          htmlFor={id}
          className={`absolute left-3 transition-all duration-200 ${
            isFocused || hasValue
              ? "top-1 text-xs text-blue-500"
              : "top-3 text-base text-gray-500"
          } peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
        >
          {label}
        </Label>
      </div>
    );
  }
);

FlyingLabelInput.displayName = "FlyingLabelInput"; // This is needed because forwardRef

export default FlyingLabelInput;
