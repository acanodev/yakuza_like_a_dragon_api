export type MainCharacter = {
  _id: string;
  name: string;
  id_num: number;
  jobs: string[];
  image: string | null;
  description: string | null;
  birth_date: string | null;
  isPlayable: boolean;
};

export type NewMainCharacter = {
  name: string;
  id_num: number;
  jobs: string[];
  image: string | null;
  description: string | null;
  birth_date: string | null;
  isPlayable?: boolean;
};

export type MainCharacterFormProps = {
  newContent: NewMainCharacter;
  editingMainCharacter: MainCharacter | null;
  onChange: (content: NewMainCharacter) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};