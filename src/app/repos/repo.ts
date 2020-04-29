
export interface Repo {
  id: number | null;
  name: string;
  created_at: Date;
  description: string;
  contributors?: string[];
}
