export const lowerCase = str => str.toLowerCase();

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const fullName = (firstName, lastName) => `${lastName}, ${firstName}`;

export const dateTime = (date, time) => new Date(`${date}T${time}`);
