import { format } from 'date-fns';

export const formatDateSafe = (date: string | undefined, formatStr: string): string => {
  if (!date) return 'Not set';
  try {
    return format(new Date(date), formatStr);
  } catch {
    return 'Invalid date';
  }
}; 