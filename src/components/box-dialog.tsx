'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateBox } from '@/lib/api';
import { generateId } from '@/lib/utils';
import { useBoxStore } from '@/providers/box-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Textarea } from './ui/textarea';
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, 'Invalid color format'),
  contents: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .min(1, 'At least one content is required'),
});

const defaultMetadata = {
  i: 0,
  x: 5,
  y: 5,
  w: 2,
  h: 2,
};

const defaultValues = {
  name: '',
  color: '#ffffff',
  contents: [{ key: '', value: '' }],
};

type FormData = z.infer<typeof formSchema>;

export function BoxDialog() {
  const open = useBoxStore((state) => state.boxDialogOpen);

  const selectedBox = useBoxStore((state) => {
    const selectedBoxId = state.selectedBoxId;
    return selectedBoxId ? state.boxes.value?.find((box) => box.id === selectedBoxId) : undefined;
  });
  const setOpen = useBoxStore((state) => state.setBoxDialogOpen);
  const addBox = useBoxStore((state) => state.addBox.trigger);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const {
    formState: { isValid, isSubmitting },
    reset,
  } = form;

  const isEditing = Boolean(selectedBox);

  const disabledSubmit = !isValid || isSubmitting;

  useEffect(() => {
    if (selectedBox) {
      reset({
        name: selectedBox.name,
        color: selectedBox.color,
        contents: (selectedBox.contents).map(({ key, value }) => ({ key, value })),
      });
    } else {
      reset(defaultValues);
    }
  }, [reset, selectedBox]);

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'contents' });

  const onSubmit = (data: FormData) => {
    form.reset();
    const id = selectedBox?.id ?? generateId();
    const meta = selectedBox?.meta ?? { ...defaultMetadata, i: id };
    const box = {
      id,
      name: data.name,
      color: data.color,
      contents: data.contents,
      meta,
    };
    const action = isEditing ? updateBox : addBox;
    action(box);
    setOpen(false);
  };

  const submitHandler = form.handleSubmit(onSubmit);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[725px]'>
        <Form {...form}>
          <form onSubmit={submitHandler} className='space-x-8'>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit' : 'Create'} a new box</DialogTitle>
              <DialogDescription>Click save when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid gap-3'>
                    <Label htmlFor='name'>Name</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem className='grid gap-3 color-picker'>
                    <Label htmlFor='color'>Color</Label>
                    <FormControl>
                      <HexColorPicker {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='grid gap-3 mt-2 p-2 max-h-80 overflow-x-auto scrollbar'>
                {fields.map(({ id }, index) => (
                  <div key={id} className='flex flex-col gap-3'>
                    <div className='flex flex-row w-full justify-between'>
                      <FormField
                        control={form.control}
                        name={`contents.${index}.key`}
                        render={({ field }) => (
                          <FormItem className='grid gap-1'>
                            <FormControl>
                              <Input placeholder='Label' {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className='flex'>
                        <Button
                          tabIndex={-1}
                          type='button'
                          hidden={index === 0}
                          data-index={index}
                          variant='ghost'
                          className='text-red-500'
                          onClick={() => remove(index)}
                        >
                          <MinusCircle />
                        </Button>
                        <Button
                          tabIndex={-1}
                          type='button'
                          hidden={index !== fields.length - 1}
                          variant='ghost'
                          onClick={() => append({ key: '', value: '' })}
                        >
                          <PlusCircle />
                        </Button>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name={`contents.${index}.value`}
                      render={({ field }) => (
                        <FormItem className='grid gap-1 w-full'>
                          <FormControl className='w-full'>
                            <Textarea placeholder='Value' rows={1} className='resize-none' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />


                  </div>
                ))}

              </div>
            </div>
            <DialogFooter className='mt-4'>
              <DialogClose asChild>
                <Button tabIndex={1} type='button' variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={disabledSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
