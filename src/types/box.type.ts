import ReactGridLayout from 'react-grid-layout';

export type TBox = {
    id: string;
    name: string;
    color: string;
    contents: Record<string, string>;
    meta: ReactGridLayout.Layout;
}