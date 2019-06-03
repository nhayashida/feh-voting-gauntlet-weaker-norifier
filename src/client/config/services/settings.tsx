import { Settings } from '../reducers/app/types';

/**
 * Update user settings
 *
 * @param props
 */
export const update = async (props: { [key: string]: string }): Promise<Settings> => {
  const res = await fetch('/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error.message);
  }
  return data;
};

export default { update };
