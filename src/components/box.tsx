import { cn, getColorContrast } from '@/lib/utils';
import { TBox } from '@/types/box.type';
import { FC, useCallback, useMemo } from 'react';
import { Content } from './box-content';
import { BoxContextMenu } from './box-context-menu';
import { Card, CardTitle } from './ui/card';

type BoxProps = {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
} & Omit<TBox, 'meta'>;
export const Box: FC<BoxProps> = ({ id, name, color, updatedAt, contents, onEdit, onDelete }) => {

  const textColor = useMemo(() => {
    const contrast = getColorContrast(color)
    return contrast === 'dark' ? 'text-gray-900' : 'text-gray-100';
  }, [color]);

  const handleContextMenuClick = useCallback((action: 'edit' | 'delete') => {
    const fn = action === 'edit' ? onEdit : onDelete;
    fn?.(id);
  }, [onEdit, onDelete, id])

  return (
    <Card
      className={cn('relative flex flex-col items-center justify-center min-h-40 h-full shadow-lg rounded-lg p-4', textColor)}
      style={{ backgroundColor: color }}
    >
      <BoxContextMenu updatedAt={updatedAt} onClick={handleContextMenuClick} />
      <CardTitle className='text-2xl font-bold mb-2 capitalize'>{name}</CardTitle>
      <div className='flex flex-col minmax-0 flex-shrink-1 flex-grow-1 items-center justify-between gap-2 w-full'>
        {contents.map(({ key, label, value }) => <Content key={key} label={label} value={value} color={textColor} />)}
      </div>
    </Card>
  );
};
