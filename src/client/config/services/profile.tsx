/**
 * Retrieve application and user profiles
 */
const load = async (): Promise<Profile> => {
  try {
    const res = await fetch('/profile');
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * Update user settings
 *
 * @param props
 */
export const update = async (props: { [key: string]: string }): Promise<UserSettings> => {
  try {
    const res = await fetch('/profile', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(props),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export default { load, update };
