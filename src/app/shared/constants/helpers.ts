
// The string must contain at least 1 lowercase alphabetical character
// The string must contain at least 1 uppercase alphabetical character
// The string must contain at least 1 numeric character
// The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
// The string must be eight characters or longer: d1H4&k98
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm;
