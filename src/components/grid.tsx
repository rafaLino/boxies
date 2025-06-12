'use client';
import { useBoxStore, useBoxStoreAsync } from '@/providers/box-provider';
import GridLayout from 'react-grid-layout';
import { Box } from './box';
export const Grid = () => {
  const boxes = useBoxStoreAsync((state) => state.boxes);
  const setLayout = useBoxStore((state) => state.setLayout.trigger);
  const setBoxDialogOpen = useBoxStore((state) => state.setBoxDialogOpen);
  const removeBox = useBoxStore((state) => state.removeBox.trigger);

  const edit = (boxId: string) => {
    setBoxDialogOpen(true, boxId);
  };

  return (
    <GridLayout
      compactType={null}
      isResizable={true}
      preventCollision={true}
      cols={12}
      rowHeight={80}
      width={1800}
      onLayoutChange={setLayout}
    >
      {boxes.value?.map((box) => (
        <div key={box.id} data-grid={box.meta}>
          <Box {...box} onEdit={edit} onDelete={removeBox} />
        </div>
      ))}
    </GridLayout>
  );
};
