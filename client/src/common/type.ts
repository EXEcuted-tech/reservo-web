type MerchDeetsBackProps = {
    setOpenRatingMod: React.Dispatch<React.SetStateAction<boolean>>;
    openRatingMod: boolean;
    trigger?: () => void;
};

type ReserveProps = {
    setOpenModalView: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
    openModalView: boolean;
    openModalEdit: boolean;
};

type ReserveCardeuProps ={
    setOpenModalView: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

type ViewModalProps ={
    setOpenModalView: React.Dispatch<React.SetStateAction<boolean>>;
}

type EditModalProps ={
    setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>; 
}