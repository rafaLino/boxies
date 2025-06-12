'use server'
import { BoxModel } from '@/db/models';
import { TBox } from '@/types/box.type';


const mapContents = (contents: Map<string, string>) => {
    const content = Object.fromEntries(contents);
    return content;
}
export async function getBoxes() {
    const boxies = await BoxModel.find()

    return boxies.map(box => ({
        id: box._id.toString(),
        name: box.name,
        color: box.color,
        contents: mapContents(box.contents),
        meta: {
            i: box.meta.i,
            x: box.meta.x,
            y: box.meta.y,
            w: box.meta.w,
            h: box.meta.h,
        }
    } as TBox))
}

export async function addBox(box: TBox) {
    const newBox = new BoxModel({
        _id: box.id,
        name: box.name,
        color: box.color,
        contents: new Map(Object.entries(box.contents)),
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
            name: box.name,
            color: box.color,
            contents: new Map(Object.entries(box.contents)),
            meta: {
                i: box.meta.i,
                x: box.meta.x,
                y: box.meta.y,
                w: box.meta.w,
                h: box.meta.h,
            },
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