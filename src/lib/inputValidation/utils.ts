import type { Validate } from './useInputValidation';

export async function validateAllRefs(
  refs: Array<{ validate: Validate } | null>,
): Promise<boolean> {
  const isValidArray = await Promise.all(
    refs.map((ref) => ref?.validate() ?? Promise.resolve(true)),
  );
  return isValidArray.every((isValid) => isValid);
}

export function isElementHasInvalidInput(element?: HTMLElement | null) {
  if (element) {
    return element.querySelectorAll('[aria-invalid="true"]').length > 0;
  }

  return false;
}
