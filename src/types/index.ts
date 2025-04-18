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
export interface ServiceData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  price: string;
  address: string;
  service_id: string;
  service_name: string;
  service_price: string;
  service_image: string;
  created_at: string;
};
export interface BookingData {
  _id: string;
  phone: string;
  date: string;
  price: string;
  address: string;
  service_name: string;
};
export interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  price: string;
  address: string;
  created_at: Date;
};



