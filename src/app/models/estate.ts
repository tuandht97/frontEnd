export interface Estate {
    id: string
    name: string,
    code: string,
    amount: number,
    price: number,
    owner: string,
    description: string,
    address: string,
    squareMeter: number,
    config: boolean,
    process: number,
    checker: string[],
    text: string;
    createdDate: Date
}