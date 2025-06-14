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
      preventCollision={true}
      allowOverlap={false}
      useCSSTransforms
      cols={12}
      rowHeight={105}
      width={1800}
      onLayoutChange={setLayout}
      className='gridlayout'
    >
      {boxes.value?.map((box) => (
        <div className='h-1' key={box.id} data-grid={{ ...box.meta, minW: 2, minH: 2 }}>
          <Box key={box.id} {...box} onEdit={edit} onDelete={removeBox} />
        </div>
      ))}
    </GridLayout>
  );

};
