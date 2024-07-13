import path from "path";
import fs from "fs";
import { getResxFileResources } from "./get-resx-file-resources";
import { generateProperties } from "./generate-properties";
import { generateNamespace } from "./generate-namespace";
import { UnableToCreateDesignerError } from "../errors/unable-to-create-designer-error";

export async function createDesignerClass(
  filePath: string,
  accessModifier: string
): Promise<void> {
  const fileName = path.basename(filePath, ".resx");
  const resources = await getResxFileResources(filePath);
  const properties = generateProperties(resources, accessModifier);
  const folderPath = path.dirname(filePath);
  const namespace = generateNamespace(folderPath);
  const className = `${fileName}.Designer.cs`;
  const classPath = path.join(folderPath, className);
  try {
    fs.writeFileSync(
      classPath,
      getDesignerClassTemplate(namespace, accessModifier, fileName, properties)
    );
  } catch (error) {
    throw new UnableToCreateDesignerError(
      `Falided to create ${className}: ${error}`
    );
  }
}

function getDesignerClassTemplate(
  namespace: string,
  accessModifier: string,
  className: string,
  properties: string
): string {
  return `
  namespace ${namespace} {
    using System;
    using System.Resources;
    using System.Globalization;

    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "17.0.0.0")]
    [System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    ${accessModifier} class ResourceErrorMessages {
        
        private static ResourceManager resourceMan;
        private static CultureInfo resourceCulture;

        internal ResourceErrorMessages() {
        }

        internal static ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    ResourceManager temp = new ResourceManager("${
                      namespace + "." + className
                    }", typeof(ResourceErrorMessages).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }

        internal static CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        ${properties}
    }
}
    `.trim();
}
