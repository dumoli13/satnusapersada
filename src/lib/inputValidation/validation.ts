type RuleRequired = 'required';
type RuleEmail = 'email';
type RuleUrl = 'url';

export type Rule = RuleRequired | RuleEmail | RuleUrl;

type Key<T> = T extends `${infer K}|${string}` ? K : T;
type RuleKey = Key<Rule>;

export type InputSelectOption = {
  id: number;
  label: string;
};

export type Value<T> =
  // | string
  // | number
  // | null
  T | T[];

interface ValidateProps<T> {
  rule: Rule;
  value: Value<T>;
}

export async function validate<T>({
  rule,
  value,
}: ValidateProps<T>): Promise<boolean> {
  const splittedRule = rule.split('|');
  const ruleKey = splittedRule[0] as RuleKey;
  switch (ruleKey) {
    case 'required':
      return (
        (!Array.isArray(value) && value !== '' && value !== null) ||
        (Array.isArray(value) && value.length > 0)
      );
    case 'email': {
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return typeof value === 'string' && value.length > 0
        ? regex.test(value)
        : true;
    }
    case 'url': {
      const regex =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/;
      return typeof value === 'string' && value.length > 0
        ? regex.test(value)
        : true;
    }
    default:
      return true;
  }
}

export function getErrorMessage(rule: Rule): string {
  const splittedRule = rule.split('|');
  const ruleKey = splittedRule[0] as RuleKey;
  switch (ruleKey) {
    case 'required':
      return 'Field is required';
    case 'email':
      return 'Invalid email';
    case 'url':
      return 'Invalid URL';
    default:
      return 'Validation error';
  }
}
