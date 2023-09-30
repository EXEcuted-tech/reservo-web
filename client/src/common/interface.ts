/*For dummy ni siya tanan and must be replaced*/

interface MerchCardProps {
    merchId: number;
    picture: string;
    businessName: string;
    rating: number,
    reviewCount: number,
    location: string,
    description: string,
    priceRange: string,
    tags: string[]
}

interface ReserveCardProps {
    reservation_id: number;
    res_date: string;
    res_time: string;
    res_location:string;
    date_received: string;
    party_size: number;
    account_id: number;
    inventory_id: number;
    merchant_id: number;
    package_id: number;
    payment_id: number;
    status: string;

    sched_id: number | null;
    settings: object | null;
    additional_details: string | null;
}

interface ReviewProps {
    reviewId: number;
    customerName: string;
    rating: number,
    comment: string;
}

interface Inventory {
    numberOfTables: number;
    numberOfChairs: number;
    numberOfPlates: number;
    numberOfGlasses: number;
    numberOfTableCloths: number;
    numberOfChairCovers: number;
  }
