/*For dummy ni siya tanan and must be replaced*/
interface Address {
    country: string | null;
    region: string | null;
    province: string | null;
    municipality: string | null;
    barangay: string | null;
}

interface MerchCardProps {
    merchant_id: number;
    merchant_name: string;
    email_address: string | null;
    logo: string | null;
    contact_number: string | null;
    address: Address | null;
    settings : Record<string,any> | null;
    sched_id: null;
    accounts: Record<string,any> | null;
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

interface Inventory {
    numberOfTables: number;
    numberOfChairs: number;
    numberOfPlates: number;
    numberOfGlasses: number;
    numberOfTableCloths: number;
    numberOfChairCovers: number;
}

interface Inventory {
    numberOfTables: number;
    numberOfChairs: number;
    numberOfPlates: number;
    numberOfGlasses: number;
    numberOfTableCloths: number;
    numberOfChairCovers: number;
}

interface PackageItem {
    package_id: string;
    package_name: string;
    package_desc: string;
    price: string;
    tags: string[];
    date_start: Date;
    date_end: Date;
    visibility: string;
    item_list: string[];
    image_filepath: string;
    oneButton: boolean;
    time_start: string;
    time_end: string;
}

interface Feedback{
    feedback_id: number;
    account_id: number;
    merchant_id: number;
    rating_value: number;
    comment: string;
}