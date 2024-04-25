'use client';

import React, {
  ChangeEvent,
  MouseEvent,
  RefCallback,
  RefObject,
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
import useInputValidation, {
  RuleObj,
  Validate,
} from '@/src/lib/inputValidation/useInputValidation';
import { Rule } from '@/src/lib/inputValidation/validation';
import { css } from '@/styled-system/css';

export interface InputTextFieldRef {
  element: HTMLDivElement | null;
  value: string;
  validate: Validate;
}

export interface TRTextFieldProps
  extends Omit<
    TextFieldProps,
    'value' | 'defaultValue' | 'onChange' | 'inputRef' | 'endAdornmentLabel'
  > {
  label?: string;
  value?: string;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
  rules?: Rule | RuleObj | Array<Rule | RuleObj>;
  onValidate?: () => void;
  shouldValidateOnChange?: undefined;
  inputRef?: RefObject<InputTextFieldRef> | RefCallback<InputTextFieldRef>;
  endAdornmentLabel?: string;
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
  endAdormentLabel: css({
    marginLeft: '5xs',
  }),
};

const SNTextField = ({
  label,
  value: valueProp,
  endAdornmentLabel,
  onChange,
  defaultValue,
  color = 'secondary',
  helperText,
  disabled,
  rules,
  onValidate,
  shouldValidateOnChange,
  inputRef,
  InputProps,
  ...props
}: TRTextFieldProps) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
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
    if (e.target.validity.valid) {
      const newValue = e.target.value;
      if (isControlled && onChange) {
        onChange(newValue);
      } else {
        setInternalValue(newValue);
        onChange?.(newValue);
      }
    }
  };
  const handleClear = () => {
    if (isControlled && onChange) {
      onChange('');
    } else {
      setInternalValue('');
      onChange?.('');
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
          endAdornment: (
            <InputAdornment position="end">
              {focused && value && value?.length > 0 && (
                <IconButton onClick={handleClear} onMouseDown={handleMouseDown}>
                  <CancelIcon />
                </IconButton>
              )}
              <p className={styles.endAdormentLabel}>{endAdornmentLabel}</p>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        fullWidth
      />
    </div>
  );
};

export default SNTextField;
