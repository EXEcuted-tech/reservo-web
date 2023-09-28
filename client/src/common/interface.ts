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

interface ReviewProps {
    reviewId: number;
    customerName: string;
    rating: number,
    comment: string;
}