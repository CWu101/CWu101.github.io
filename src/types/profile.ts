export type InternshipEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
  logo?: string;
};

export type ProjectEntry = {
  name: string;
  period: string;
  status: string;
  tagline: string;
  summary: string;
  tags: string[];
};

export type Profile = {
  sidebar: {
    name: string;
    tagline: string;
  };
  about: string[];
  internships: InternshipEntry[];
  projects: ProjectEntry[];
  contact: {
    description: string;
    email: string;
    github: {
      label: string;
      href: string;
    };
  };
};
