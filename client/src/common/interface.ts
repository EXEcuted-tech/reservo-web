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
    settings: string | null;
    additional_details: string | null;
}

interface Inventory {
    no_of_tables: number;
    no_of_chairs: number;
    no_of_plates: number;
    no_of_glasses: number;
    no_of_tableCloths: number;
    no_of_chairCovers: number;
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

interface Payment{
    payment_id:number;
    total_expense: number;
    balance: number;
    payment_status: string;
    payment_date: Date;
}

interface MerchData{
    merchant_id: number;
    merchant_name: string;
    email_address: string;
    logo: string;
    contact_number: string;
    address: string;
    settings: string;
    form_deets: string;
    sched_id: number;
    accounts: string;
}


// interface Account{
//     account_id:number;
//     account_name:string;
//     account_status:string;
//     account_type:number;
//     contact_number
// }