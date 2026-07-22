export interface IBook {
  _id: string;
  title: string;
  author: string;
  description:string
  image:string
  rating:number
  price: number;
  category: string;
  totalCopies:number
  availableCopies:number
  featured:boolean
}
