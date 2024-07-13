import fs from "fs";
import * as xml2js from "xml2js";
import { Resources } from "../types/resources";
import { XmlData } from "../types/xml-data";

export async function getResxFileResources(
  filePath: string
): Promise<Resources> {
  const resxFileContent = fs.readFileSync(filePath, "utf-8");
  const parser = new xml2js.Parser();
  const parsedXml = await parser.parseStringPromise(resxFileContent);

  const resources: Resources = parsedXml.root.data.map((data: XmlData) => ({
    name: data.$.name,
  }));

  return resources;
}
