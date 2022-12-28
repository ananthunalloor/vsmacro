import { camelCase, pascalToCamel } from "./utils";

/**
 * It takes a component name, and returns a string that is a template for a React
 * component
 * @param {string} [componentName] - The name of the component.
 */
export const componentTemplate = (componentName: string) => {
  const camelCaseName = pascalToCamel(componentName);

  return `interface ${componentName + "Props"} {
  // Props go here, Example:
  id?: string;
}

const ${camelCaseName} = ({ id /* Destructured props go here */ }: ${
    componentName + "Props"
  }) => {
  // Component logic goes here

  return <>${componentName}</>;
};

export default ${camelCaseName};
`;
};

/**
 * It takes in two arguments, a component name and a file name, and returns a
 * string that is a template for a test file
 * @param {string} [componentName] - The name of the component
 * @param {string} [fileName] - The name of the  component file.
 */
export const testTemplate = (componentName?: string, fileName?: string) => `
import { render, cleanup } from '@testing-library/react';

import ${componentName} from './${fileName}';

afterEach(cleanup);

describe('${componentName}', () => {
  it('renders without crashing', () => {
    const { container } = render(<${componentName} />);
    expect(container).toBeTruthy();
  });
});
`;

export const advancedTestTemplate = (
  componentName?: string,
  fileName?: string,
  testCases?: any
) => `
import { render, cleanup } from '@testing-library/react';

import ${componentName} from './${fileName}';

afterEach(cleanup);

describe('${componentName}', () => {
  it('renders without crashing', () => {
    const { container } = render(<${componentName} />);
    expect(container).toBeTruthy();
  });

  //Advanced test cases go here
  ${testCases?.join("")}
});
`;
