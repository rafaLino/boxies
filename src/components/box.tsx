import { replaceContent } from '@/lib/replace-content';
import { cn, formatNumber, getColorContrast } from '@/lib/utils';
import { TBox } from '@/types/box.type';
import { FC, useMemo } from 'react';
import { BoxContextMenu } from './box-context-menu';
import { Card, CardDescription, CardTitle } from './ui/card';
import { Label } from './ui/label';

type BoxProps = {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
} & Omit<TBox, 'meta'>;
export const Box: FC<BoxProps> = ({ id, name, color, contents, onEdit, onDelete }) => {
  const contentArray = useMemo(() => Object.entries(replaceContent(contents)), [contents]);
  const contrast = useMemo(() => getColorContrast(color), [color]);
  const textColor = useMemo(() => {
    return contrast === 'dark' ? 'text-gray-900' : 'text-gray-100';
  }, [contrast]);

  const handleContextMenuClick = (action: 'edit' | 'delete') => {
    const fn = action === 'edit' ? onEdit : onDelete;
    fn?.(id);
  }

  return (
    <Card
      className={cn('relative flex flex-col items-center justify-center min-h-40 shadow-lg rounded-lg p-4', textColor)}
      style={{ backgroundColor: color }}
    >
      <BoxContextMenu onClick={handleContextMenuClick}/>
      <CardTitle className='text-2xl font-bold mb-2 capitalize'>{name}</CardTitle>
      <div className='flex flex-col items-center justify-between mb-2 gap-2 w-full'>
        {contentArray.map(([key, value]) => (
          <div key={key} className='flex flex-row gap-2 justify-between w-full'>
            <Label className={cn('capitalize', textColor)}>{key}</Label>
            <CardDescription className={textColor}>{formatNumber(value)}</CardDescription>
          </div>
        ))}
      </div>
    </Card>
  );
};
