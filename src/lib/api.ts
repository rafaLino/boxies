'use server'
import { BoxModel, IBoxModel } from '@/db/models';
import { TBox } from '@/types/box.type';
import { evalValue } from './content-mapper';
import { verifySession } from '@/lib/session';


export async function getBoxes(): Promise<TBox[]> {
    const session = await verifySession();
    const boxes = await BoxModel.find<IBoxModel>({ userId: session.userId })
    return boxes.map(item => ({
        id: item._id.toString(),
        name: item.name,
        color: item.color,
        contents: item.contents.map(content => ({
            label: content.label,
            key: content.key,
            value: content.value,
            expression: content.expression
        })),
        updatedAt: item.updatedAt,
        meta: {
            i: item.meta.i,
            x: item.meta.x,
            y: item.meta.y,
            w: item.meta.w,
            h: item.meta.h
        }
    }))
}

export async function addBox(box: TBox) {
    const session = await verifySession();
    const newBox = new BoxModel({
        userId: session.userId,
        _id: box.id,
        name: box.name,
        color: box.color,
        contents: evalValue(box.contents),
        meta: {
            i: box.meta.i,
            x: box.meta.x,
            y: box.meta.y,
            w: box.meta.w,
            h: box.meta.h,
        },
    })
    await newBox.save()
}

export async function updateBox(box: TBox) {
    const updatedBox = await BoxModel.findByIdAndUpdate(
        box.id,
        {
            updatedAt: Date.now(),
            name: box.name,
            color: box.color,
            contents: evalValue(box.contents),
        },
        { new: true }
    )
    if (!updatedBox) {
        throw new Error('Box not found')
    }

}

export async function deleteBox(id: string) {
    const deletedBox = await BoxModel.findByIdAndDelete(id)
    if (!deletedBox) {
        throw new Error('Box not found')
    }
}

export async function setLayout(layout: ReactGridLayout.Layout[]) {
    const promises = layout.map(async item => {
        return BoxModel.updateOne(
            { _id: item.i },
            { meta: { i: item.i, x: item.x, y: item.y, w: item.w, h: item.h } }
        ).exec();
    })
    await Promise.all(promises);

}