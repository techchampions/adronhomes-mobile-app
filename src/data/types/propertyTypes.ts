export type PropertyType = {
  id: number;
  name: string;
};

export type PropertiesTypeResponse = {
  success: boolean;
  propertiesType: PropertyType[];
};
