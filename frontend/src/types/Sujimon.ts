export type Sujimon = {
  _id: string;
  name: string;
  id_num: number;
  category: string;
  common_locations: string[];
  rarity: number;
  skills: string[];
  weaknesses: string[];
  drops: string[];
  image: string;
  description: string;
};

export type NewSujimon = {
  name: string;
  id_num: number;
  category: string;
  common_locations: string[];
  rarity: number;
  skills: string[];
  weaknesses: string[];
  drops: string[];
  image: string;
  description: string;
};

export type SujimonFormProps = {
  newContent: NewSujimon;
  editingSujimon: Sujimon | null;
  onChange: (content: NewSujimon) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};