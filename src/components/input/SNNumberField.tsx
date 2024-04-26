import React, {
  ChangeEvent,
  MouseEvent,
  RefCallback,
  RefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import useInputValidation, {
  RuleObj,
  Validate,
} from '@/src/lib/inputValidation/useInputValidation';
import { Rule } from '@/src/lib/inputValidation/validation';
import { css } from '@/styled-system/css';

export interface InputNumberFieldRef {
  element: HTMLDivElement | null;
  value: number | null;
  validate: Validate;
}

export interface TRNumberFieldProps
  extends Omit<
    TextFieldProps,
    'value' | 'defaultValue' | 'onChange' | 'inputRef'
  > {
  label?: string;
  value?: number;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  rules?: Rule | RuleObj | Array<Rule | RuleObj>;
  onValidate?: () => void;
  shouldValidateOnChange?: undefined;
  inputRef?: RefObject<InputNumberFieldRef> | RefCallback<InputNumberFieldRef>;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: number | null } }) => void;
  name: string;
}

const styles = {
  container: css({
    width: 'full',
  }),
  label: css({
    color: 'light.foreground.60',
    fontSize: 'small',
    marginBottom: '3xs',
  }),
};

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  ({ onChange, ...props }, ref) => (
    <NumericFormat
      {...props}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue || null,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  ),
);

const SNNumberField = ({
  label,
  value: valueProp,
  defaultValue,
  onChange,
  color = 'secondary',
  helperText,
  disabled,
  rules,
  onValidate,
  shouldValidateOnChange,
  inputRef,
  InputProps,
  ...props
}: TRNumberFieldProps) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState<number | null>(
    defaultValue || null,
  );
  const elementRef = useRef<HTMLInputElement>(null);

  const isControlled = typeof valueProp !== 'undefined';
  const value = isControlled ? valueProp : internalValue;

  const [error, validate] = useInputValidation({
    value,
    rules,
    disabled,
    onValidate,
    shouldValidateOnChange,
  });

  useImperativeHandle(inputRef, () => ({
    element: elementRef.current,
    value,
    validate,
  }));

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value ? parseInt(e.target.value, 10) : null;
    if (isControlled && onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleClear = () => {
    if (isControlled && onChange) {
      onChange(0);
    } else {
      setInternalValue(0);
      onChange?.(0);
    }
  };

  return (
    <div className={styles.container}>
      {label && <p className={styles.label}>{label}</p>}
      <TextField
        {...props}
        color={color}
        error={error.length > 0}
        helperText={error || helperText}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        ref={elementRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        InputProps={{
          endAdornment: focused && value !== 0 && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} onMouseDown={handleMouseDown}>
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          ),
          inputComponent: NumericFormatCustom as any,
          ...InputProps,
        }}
        fullWidth
      />
    </div>
  );
};

export default SNNumberField;
