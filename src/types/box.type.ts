import ReactGridLayout from 'react-grid-layout';

export interface TBox {
    id: string;
    name: string;
    color: string;
    contents: TContent[];
    updatedAt?: Date;
    meta: ReactGridLayout.Layout;
}

export type TContent = {
    label: string
    key: string;
    value: string;
    expression: string;
}
