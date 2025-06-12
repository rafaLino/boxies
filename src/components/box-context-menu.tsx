import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react';

type BoxContextMenuProps = {
  onClick?: (action: 'edit' | 'delete') => void;
};
export function BoxContextMenu({ onClick }: Readonly<BoxContextMenuProps>) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild className='absolute right-2 top-2'>
        <MoreHorizontalIcon className='h-4 w-4' />
      </ContextMenuTrigger>
      <ContextMenuContent className='w-52'>
        <ContextMenuItem inset onSelect={() => onClick?.('edit')} className='justify-between'>
          Edit <PencilIcon className='w-4 h-4' />
        </ContextMenuItem>
        <ContextMenuItem inset onSelect={() => onClick?.('delete')} className='justify-between'>
          Delete <Trash2Icon className='w-4 h-4' />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
