export interface Item {
    id: string;
    code: string;
    amount: number;
    price: number;
    owner: string;
    sold: boolean;
    change: number;
    createdDate: Date;
}
