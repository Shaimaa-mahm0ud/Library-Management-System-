export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    image: string;
    category: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    available: boolean;
    featured: boolean;
    price: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}