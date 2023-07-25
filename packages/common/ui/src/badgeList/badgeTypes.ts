export interface Badge {
  name: string;
  image: string;
  type: string;
  date: string;
  link?: string;
}

export interface BadgeListProps {
  badges: Badge[];
}
