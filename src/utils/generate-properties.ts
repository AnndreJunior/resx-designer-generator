import { Resources } from "../types/resources";

export function generateProperties(
  resources: Resources,
  accessModifier: string
): string {
  let properties = "";

  resources.forEach((resource) => {
    properties += `
        ${accessModifier} static string ${resource.name} {
            get {
                return ResourceManager.GetString("${resource.name}", resourceCulture);
            }
        }
`;
  });

  return properties;
}
