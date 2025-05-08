export interface AboutUsSection {
  header: string;
  description: string;
}

export interface MissionVisionSection {
  header: string;
  description: string;
  image: string;
}

export interface ValuesSection {
  header: string;
  list_description: string[];
  image: string;
}

export interface LeadershipText {
  header: string;
  description: string;
}

export interface LeadershipMember {
  name: string;
  position: string;
  picture: string;
}

export interface AboutPageData {
  aboutUs: AboutUsSection[];
  mission: MissionVisionSection[];
  vision: MissionVisionSection[];
  values: ValuesSection[];
  leadershipText: LeadershipText[];
  leaderships: LeadershipMember[];
}

export interface AboutPageResponse {
  status: string;
  message: string;
  data: AboutPageData;
}
