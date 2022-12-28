// function to convert a path to directory and file name
export function getDirAndFile(path: string) {
  //if there is filename, then remove the filename from the path

  const pathParts = path.split("/");
  const fileName = pathParts.pop();
  const dir = pathParts.join("/");
  return { dir, fileName };
}

/**
 * It takes a string, splits it into words, capitalizes the first letter of each
 * word, and joins them back together
 * @param {string} [str] - The string to convert to PascalCase.
 * @returns A function that takes a string and returns a string.
 */
export const pascalCase = (str?: string) => {
  return (
    str
      ?.split(/[\s_-]/)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join("") || ""
  );
};

/**
 * It takes a string, splits it into an array of words, then maps each word to a
 * new word where the first letter is capitalized, and then joins the array back
 * into a string
 * @param {string} [str] - The string to convert to camel case.
 * @returns A function that takes a string and returns a string.
 */
export const camelCase = (str?: string) => {
  return (
    str
      ?.split(/[\s_-]/)
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word[0].toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("") || ""
  );
};

/**
 * It takes a string, splits it on capital letters, lowercases the resulting words,
 * and joins them with dashes
 * @param {string} [str] - The string to convert to kebab case.
 * @returns A function that takes a string and returns a string.
 */
export const kebabCase = (str?: string) => {
  return (
    str
      ?.split(/(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("-") || ""
  );
};

export const inputOptions = {
  title: "Enter Component Name",
  prompt: "Name should be in PascalCase",
  placeHolder: "ComponentName",
  validateInput: (value: string) => {
    if (value.length === 0) {
      return "Component name cannot be empty";
    }
    //validate if the name is in PascalCase
    if (!value.match(/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/)) {
      return "Component name should be in PascalCase";
    }
    return null;
  },
};

//convert pascal case to camel case
export const pascalToCamel = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.substring(1) || "";
};
