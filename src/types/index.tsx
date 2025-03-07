export type Language = "en" | "ge";

export type ServiceMethods = "delievry" | "takeaway" | "dinein";

export type PaymentMethods = "card" | "cash" | "online";

export type Categories =
  | "offers"
  | "pizza"
  | "bread"
  | "chicken"
  | "sandwich"
  | "wrap"
  | "loadpotato"
  | "dessert"
  | "drinks"
  | "sauce";

export type SubCategories =
  | "all"
  | "favorite"
  | "special"
  | "premium"
  | "half_half"
  | "makeyourown"
  | "chickenlovers"
  | "all_drinks"
  | "softdrink"
  | "fruitjuice"
  | "water";

export type Sizes =
  | "small"
  | "medium"
  | "large"
  | "250ml"
  | "330ml"
  | "500ml"
  | "1l";

export type ItemPaymentMethod = Record<PaymentMethods, boolean>;

export type ItemServiceMethod = Record<ServiceMethods, boolean>;

export type Content = {
  web: string;
  web_desc: string;
  web_media_detail: string;
  web_media_global: string;
  mobile: string;
  mobile_desc: string;
  mobile_media_detail: string;
  mobile_media_global: string;
  call_center: string;
  call_center_desc: string;
  call_center_media_detail: string;
  call_center_media_global: string;
};

export type Address = {
  additional_info: string | null;
  address_type: string | null;
  apartment_number: string | number | null;
  building_number: string | number | null;
  channel: string;
  city: string;
  door: string | number | null;
  floor: string | number | null;
  id: number | string;
  is_active: boolean;
  is_default: boolean;
  location: { type: "Point"; coordinates: number[][] };
  resource_id: string | number;
  state: string | null;
  street_name: string | null;
  street_number: string | number | null;
  zip_code: string | number | null;
};

export type Name = {
  en: string;
  ge: string;
};

export type User = {
  addresses: Address[];
  first_name: string;
  last_name: string;
  phone_code: string;
  phone: string;
  gender: string | null;
  is_complete_profile: boolean | null;
  email: string | null;
  profile_pic: string | null;
  is_guest: boolean;
  date_of_birth: string | null;
  full_phone: string;
  language: Language | null;
  _id: string | number;
  loyalty_points: string | number | null;
  total_user_loyalty_points: string | number | null;
  total_user_loyalty_points_profile: string | number | null;
  total_user_loyalty_points_redeemed: string | number | null;
};

export type StoreDetails = {
  store_code: string;
  is_active: boolean;
  store_type: string;
  store_name: {
    en: string;
    ge: string;
  };
  store_desc: Record<string, string>;
  store_open_at: string;
  store_close_at: string;
  store_delivery_till: string;
  store_image: string;
  is_price_main_store: boolean;
  city: string;
  phone: string;
  lng: number;
  lat: number;
  is_redirect: boolean;
  redirect_to: string;
  redirect_start_date: string | null;
  redirect_end_date: string | null;
  is_fault: boolean;
  fault_redirect_to: string;
  redirect_reason: string | null;
  other_redirect_reason: string | null;
  polygons: {
    type: "Polygon";
    coordinates: number[][][];
  };
  address: {
    ge: string;
    en: string;
  };
  delivery_type: string[];
  online_options: string[];
  terminal_options: string[];
  store_channel: string[];
  payment_type: string[];
};

export type WeekDays = {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thurs: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
};

export type ItemSizes = {
  is_active: boolean;
  product_price: number;
  size_code: Sizes;
  size_decription: Name;
  size_number: null | number;
  size_short_decription: Name;
  size_unit: string | number | null;
};

export type ItemStore = {
  id: number;
  store_code: string;
};

export type DoughPrice = {
  code: string;
  price: number;
  size_code: string;
};

export type Crust = {
  dough_desc: Name;
  dough_prices: DoughPrice[];
  dough_code: string;
};

export type Edge = {
  dough_desc: Name;
  dough_prices: DoughPrice[];
  dough_code: string;
};

export type ContentName = {
  en: string;
  ge: string;
};

export type Topping = {
  topping_size: string;
  topping_code: string;
  topping_price: number;
  is_standard: boolean;
  is_removed: boolean;
  topping_name: ContentName;
};

export type Product = {
  payment_method: ItemPaymentMethod;
  service_method: ItemServiceMethod;
  is_sold: boolean;
  stores: ItemStore[];
  category_code: Categories;
  sub_category_code: SubCategories | null;
  osg_code?: string | null;
  product_code: string;
  quantity: number;
  dough_code: string | null;
  edge_code: string | null;
  size_code: string | null;
  slices_code?: number | null;
  product_actual_price: number;
  product_price: number;
  special_instructions: string | null;
  price: number;
  crust?: Crust[];
  edges?: Edge[];
  toppings?: Topping[];
  en_content: Partial<Content>;
  ge_content: Partial<Content>;
  product_name: {
    en: string;
    ge: string;
  };
};

type DealItem = {
  max_discount: number;
  minimum_price: number;
  discount_type: string;
};

export type CartItem = {
  stores: {
    id: number;
    store_code: string;
  }[];
  week_days: WeekDays;
  service_method: ItemServiceMethod;
  payment_method: ItemPaymentMethod;
  size_code?: Sizes;
  is_sold: boolean;
  is_reorder: boolean;
  category_code: Categories;
  sub_category_code: SubCategories | null;
  deal_code?: string;
  osg_code?: string | null;
  product_code?: string | null;
  quantity: number;
  actual_price: number;
  product_actual_price: number;
  price: number;
  related_promo_product?: boolean | null | undefined;
  en_content: Content;
  product_price: number | string;
  product_discount: number | undefined;
  discount_applied: boolean;
  is_redeemed?: boolean;
  coupon_type?: string | null | undefined;
  is_discount_available: boolean;
  product_discount_type: string | undefined;
  ge_content: Content;
  original_price?: string;
  allowed_items?: any;
  promo_applied?: boolean | undefined;
  loyalty_point_allowed?: boolean;
  loyalty_redeem_allowed?: boolean;
  product_sizes?: ItemSizes[];
  is_coupon_redeemed_points?: boolean;
  coupon_redeemed_points?: number | null;
  max_order_quantity?: string;
  is_active: boolean;
  products: Product[];
  deal_items?: DealItem[];
  is_starting_from?: boolean;
  start_time?: string | null;
  start_date?: string | null;
  end_time?: string | null;
  end_date?: string | null;
  id: string | number;
};
