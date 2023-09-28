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
    reserveId: number;
    organizerName: string,
    clientName: string,
    eventSize: number,
    time: string,
    status: string
}


interface ReviewProps {
    reviewId: number;
    customerName: string;
    rating: number,
    comment: string;
}