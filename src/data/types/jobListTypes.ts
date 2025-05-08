export interface Job {
  id: number;
  job_title: string;
  description: string;
  location: string;
  job_type: string;
  key_responsibility: string[];
  requirements: string[];
  qualifications: string[];
  image: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface JobHeader {
  header: string;
}

export interface JobsData {
  jobs_header: JobHeader[];
  jobs_post: Job[];
}

export interface JobsApiResponse {
  status: string;
  message: string;
  data: JobsData;
}

// Job Details

export interface JobDetail {
  id: number;
  job_title: string;
  description: string;
  location: string;
  job_type: string;
  key_responsibility: string[];
  requirements: string[];
  qualifications: string[];
  image: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface GetJobByIdResponse {
  status: string;
  message: string;
  data: {
    job_details: JobDetail[];
  };
}
