import ReactGridLayout from 'react-grid-layout';

export type TBox = {
    id: string;
    name: string;
    color: string;
    contents: TContent[];
    updatedAt?: Date;
    meta: ReactGridLayout.Layout;
}

export type TContent = {
    key: string;
    value: string;
    displayValue?: string;
}

export type KeyValue = {
    key: string;
    value: string;
}