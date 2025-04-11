export interface ServiceItem {
    _id: string;
    img: string;
    title: string;
    price: string | number;
  }

  export interface UserT {
    _id?: string;
    name?: string;
    email: string;
    password: string;
    image?: string;
  }
  
  