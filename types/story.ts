export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
}

export interface Category {
  _id: string;
  name: string;
}