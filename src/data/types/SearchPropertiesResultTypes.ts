import { Property } from "./propertiesPageTypes";

export interface PropertiesSearchResultResponse {
  status: string;
  message: string;
  properties: Property[];
}
