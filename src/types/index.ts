export interface Zikir {
  id: number;
  name: string;
  arabicName?: string;
  count: number;
  target: number;
  createdAt: string; // ISO 8601
}

export interface ZikirFormData {
  name: string;
  arabicName?: string;
  target: number;
}

export type RootStackParamList = {
  Counter: { activeZikir?: Zikir } | undefined;
  Zikirlerim: undefined;
  Settings: undefined;
};
