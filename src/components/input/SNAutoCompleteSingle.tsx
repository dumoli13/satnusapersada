import React, {
  RefCallback,
  RefObject,
  SyntheticEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import useInputValidation, {
  RuleObj,
  Validate,
} from '@/src/lib/inputValidation/useInputValidation';
import { InputSelectOption, Rule } from '@/src/lib/inputValidation/validation';
import { css } from '@/styled-system/css';

export interface InputAutoCompleteSingleRef {
  element: HTMLDivElement | null;
  value: InputSelectOption | null;
  validate: Validate;
}

interface TRAutoCompleteSingleProps
  extends Omit<
    AutocompleteProps<InputSelectOption, false, false, false>,
    'value' | 'onChange' | 'options' | 'inputRef' | 'renderInput'
  > {
  label?: string;
  placeholder?: string;
  options: Array<InputSelectOption>;
  value?: InputSelectOption | null;
  defaultValue?: InputSelectOption | null;
  onChange?: (value: InputSelectOption | null) => void;
  rules?: Rule | RuleObj | Array<Rule | RuleObj>;
  onValidate?: () => void;
  shouldValidateOnChange?: undefined;
  inputRef?:
    | RefObject<InputAutoCompleteSingleRef>
    | RefCallback<InputAutoCompleteSingleRef>;
  helperText?: string;
  startAdornment?: JSX.Element;
  endAdornment?: JSX.Element;
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

const SNAutoCompleteSingle = ({
  label,
  placeholder,
  options,
  value: valueProp,
  defaultValue,
  onChange,
  disabled,
  rules,
  onValidate,
  shouldValidateOnChange,
  inputRef,
  helperText,
  startAdornment,
  endAdornment,
  ...props
}: TRAutoCompleteSingleProps) => {
  const [internalValue, setInternalValue] = useState<InputSelectOption | null>(
    defaultValue || null,
  );
  const elementRef = useRef<HTMLDivElement>(null);

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

  const handleChange = (
    event: SyntheticEvent,
    newValue: InputSelectOption | null,
  ) => {
    if (isControlled && onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className={styles.container}>
      {label && <p className={styles.label}>{label}</p>}
      <Autocomplete
        {...props}
        options={options}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        ref={elementRef}
        autoHighlight
        isOptionEqualToValue={(option, val) => option.id === val.id}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            fullWidth
            value={value}
            color="secondary"
            error={error.length > 0}
            helperText={error || helperText}
            InputProps={{
              ...params.InputProps,
              startAdornment:
                startAdornment || params.InputProps.startAdornment,
              endAdornment: endAdornment || params.InputProps.endAdornment,
            }}
          />
        )}
      />
    </div>
  );
};

export default SNAutoCompleteSingle;
