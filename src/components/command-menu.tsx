'use client';

import { Box, Calculator, Pencil } from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useBoxStore } from '@/providers/box-provider';
import { CommandMenuKeydown } from './command-menu-keydown';

export function CommandMenu() {
  const open = useBoxStore((state) => state.commandMenuOpen);
  const setCommandMenu = useBoxStore((state) => state.setCommandMenuOpen);
  const setDialog = useBoxStore((state) => state.setBoxDialogOpen);
  const boxes = useBoxStore((state) => state.boxes);

  const handleOpenDialog = (value?: string) => {
    setCommandMenu(false);
    const box = boxes.value?.find((box) => box.name === value);
    setDialog(true, box?.id);
  };

  const handleOpenCommandMenu = () => {
    setCommandMenu(true);
  };

  return (
    <>
      <CommandMenuKeydown onKeyPress={handleOpenCommandMenu} />
      <CommandDialog open={open} onOpenChange={setCommandMenu}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem onSelect={handleOpenDialog}>
              <Box />
              <span>Create new box</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Edit'>
            {boxes.value?.map((box) => (
              <CommandItem key={box.id} onSelect={handleOpenDialog}>
                <Pencil />
                <span className='capitalize'>{box.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
