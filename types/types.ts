export type todo = {
  id: number;
  title: string;
  description?: string;
  isDone: number;
  createdAt: Date;
  updatedAt: Date;
};

export type settings = {
  deleteOnComplete: boolean;
};
