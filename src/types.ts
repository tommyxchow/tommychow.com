export interface LinkInfo {
  icon?: React.ReactNode;
  title: string;
  href: string;
}

export interface ProjectInfo {
  name: string;
  date: string;
  description: string;
  imageLink: string;
  repoLink: string;
  figmaLink?: string;
  demoLink?: string;
}
