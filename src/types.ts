export interface LinkInfo {
  icon?: React.ReactNode;
  title: string;
  href: string;
}

export interface ProjectInfo {
  id: string;
  name: string;
  shortDescription: string;
  thumbnailLink: string;
  dateCompleted?: string;
  longDescription: string;
  background: string;
  links: LinkInfo[];
  screenshotLinks?: string[];
  technologies: string[];
}

export interface Skill {
  icon: React.ReactNode;
  name: string;
  color: string;
}
