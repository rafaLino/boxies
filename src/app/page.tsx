import { BoxDialog } from '@/components/box-dialog';
import { CommandMenu } from '@/components/command-menu';
import { Grid } from '@/components/grid';
import { getBoxes } from '@/lib/api';
import { verifySession } from '@/lib/session';
import { BoxStoreProvider } from '@/providers/box-provider';

export default async function Home() {
  await verifySession();
  const boxes = await getBoxes();
  return (
    <BoxStoreProvider serverSideData={{ boxes }}>
      <div className='bg-gray-100 min-h-screen min-w-screen'>
        <Grid />
        <CommandMenu />
        <BoxDialog />
      </div>
    </BoxStoreProvider>
  );
}
