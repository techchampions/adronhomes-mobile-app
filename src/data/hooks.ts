import { useQuery } from "@tanstack/react-query";
import {
  fetchAboutPageData,
  fetchContactPageData,
  fetchHomePageData,
  fetchJobsPageData,
  fetchPropertiesPageData,
  fetchVirtualTourPageData,
  getAllPropertyLocations,
  getAllPropertyType,
  getJobByID,
  getPropertyByID,
} from "./api";
import { HomepageResponse } from "./types/homepageTypes";
import { AboutPageResponse } from "./types/aboutPageTypes";
import { ContactPageResponse } from "./types/contactPageTypes";
import { VirtualTourResponse } from "./types/virtualTourPageTypes";
import { PropertiesResponse } from "./types/propertiesPageTypes";
import { GetPropertyByIdResponse } from "./types/GetPropertyByIdResponse";
import { GetJobByIdResponse, JobsApiResponse } from "./types/jobListTypes";
import { PropertyLocationResponse } from "./types/PropertyLocationTypes";
import { PropertiesTypeResponse } from "./types/propertyTypes";

// Query hook for homepage data with
export const useHomepage = () => {
  return useQuery<HomepageResponse>({
    queryKey: ["home-page"],
    queryFn: fetchHomePageData,
  });
};

// Query hook for aboutpage data with
export const useAboutpage = () => {
  return useQuery<AboutPageResponse>({
    queryKey: ["about-page"],
    queryFn: fetchAboutPageData,
  });
};
// Query hook for contactpage data with
export const useContactpage = () => {
  return useQuery<ContactPageResponse>({
    queryKey: ["contact-page"],
    queryFn: fetchContactPageData,
  });
};
// Query hook for virtual-tour page data with
export const useVirtualTourpage = () => {
  return useQuery<VirtualTourResponse>({
    queryKey: ["virtual-tour-page"],
    queryFn: fetchVirtualTourPageData,
  });
};
// Query hook for properties page data with
// export const usePropertiespage = (page: number) => {
//   return useQuery<PropertiesResponse>({
//     queryKey: ["properties-page", page],
//     queryFn: () => fetchPropertiesPageData(page),
//   });
// };
export const usePropertiespage = (
  page: number,
  filters?: Record<string, any>
) => {
  return useQuery<PropertiesResponse>({
    queryKey: ["properties-page", page, filters],
    queryFn: () => fetchPropertiesPageData(page, filters),
  });
};

// Query hook for properties page data with
export const useGetPropertyByID = (id: number | string) => {
  return useQuery<GetPropertyByIdResponse>({
    queryKey: ["property", id], // include id in the key to avoid collisions
    queryFn: () => getPropertyByID(id),
    enabled: !!id, // prevents the query from running if id is undefined/null
  });
};
// Query hook for properties page data with
export const useJobListPage = () => {
  return useQuery<JobsApiResponse>({
    queryKey: ["jobs-page"],
    queryFn: fetchJobsPageData,
  });
};
// Query hook for Jobs by ID data with
export const useGetJobByID = (id: number | string) => {
  return useQuery<GetJobByIdResponse>({
    queryKey: ["job", id], // include id in the key to avoid collisions
    queryFn: () => getJobByID(id),
    enabled: !!id, // prevents the query from running if id is undefined/null
  });
};
// Query hook for properties Locations data with
export const useGetAllPropertyLocations = () => {
  return useQuery<PropertyLocationResponse>({
    queryKey: ["property-locations"],
    queryFn: () => getAllPropertyLocations(),
  });
};
// Query hook for properties types data with
export const useGetAllPropertyTypes = () => {
  return useQuery<PropertiesTypeResponse>({
    queryKey: ["property-types"],
    queryFn: getAllPropertyType,
  });
};
