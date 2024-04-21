import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { type Value, type Rule, getErrorMessage, validate } from './validation';

export type RuleObj = { rule: Rule; errorMessage?: string };

export interface InputValidationProps {
  rules?: Rule | RuleObj | Array<Rule | RuleObj>;
  onValidate?: () => void;
  /**
   * @default true
   */
  shouldValidateOnChange?: boolean;
}

interface UseInputValidationProps<T> extends InputValidationProps {
  value: Value<T>;
  disabled?: boolean;
}

export type Validate = () => Promise<boolean>;

type Return = [string, Validate];

const useInputValidation = <T extends any>({
  value,
  rules,
  disabled,
  onValidate,
  shouldValidateOnChange = true,
}: UseInputValidationProps<T>): Return => {
  const [errorMessage, setErrorMessage] = useState('');
  const validateValue = useCallback(async () => {
    let message = '';

    if (disabled || !rules) {
      return message;
    }
    if (typeof rules === 'string') {
      const isValid = await validate({ rule: rules, value });
      if (!isValid) {
        message = getErrorMessage(rules);
      }
    } else if (Array.isArray(rules)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const rule of rules) {
        if (typeof rule === 'string') {
          // eslint-disable-next-line no-await-in-loop
          const isValid = await validate({ rule, value });
          if (!isValid) {
            message = getErrorMessage(rule);
            break;
          }
        } else {
          const { rule: ruleItem, errorMessage: customErrorMessage } = rule;
          // eslint-disable-next-line no-await-in-loop
          const isValid = await validate({ rule: ruleItem, value });
          if (!isValid) {
            message = customErrorMessage || getErrorMessage(ruleItem);
            break;
          }
        }
      }
    } else {
      const { rule, errorMessage: customErrorMessage } = rules;
      // eslint-disable-next-line no-await-in-loop
      const isValid = await validate({ rule, value });
      if (!isValid) {
        message = customErrorMessage || getErrorMessage(rule);
      }
    }

    return message;
  }, [value, rules]);

  const validateOnChange = async () => {
    const isFalsy = !value || (Array.isArray(value) && value.length === 0);
    if (isFalsy) {
      setErrorMessage('');
    } else {
      const message = await validateValue();
      setErrorMessage(message);
    }
  };

  const debouncedValidate = useDebouncedCallback(() => {
    validateOnChange();
  }, 200);

  useEffect(() => {
    if (shouldValidateOnChange) {
      debouncedValidate();
    } else if (errorMessage) {
      setErrorMessage('');
    }
  }, [value, rules]);

  useEffect(() => {
    if (disabled) {
      setErrorMessage('');
    }
  }, [disabled]);

  useEffect(() => {
    onValidate?.();
  }, [errorMessage]);

  return [
    errorMessage,
    async () => {
      const message = await validateValue();
      setErrorMessage(message);
      return message === '';
    },
  ];
};

export default useInputValidation;
