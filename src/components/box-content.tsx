import { cn, format } from "@/lib/utils"
import { FC, memo } from "react"
import { CardDescription } from "./ui/card"

const areLargeTexts = (label: string, value: string) => {
    return label.length > 18 || value.length > 18
}
export const Content: FC<{ label: string, value?: string, color: string }> = memo(({ label, value = '', color }) => {
    const flexDirection = areLargeTexts(label, value) ? 'flex-col' : 'flex-row'
    return (
        <div key={label} className={cn('flex gap-2 justify-between w-full whitespace-pre-line', flexDirection)}>
            <span className={cn('capitalize font-bold', color)}>{label}</span>
            <CardDescription className={color}>{format(value)}</CardDescription>
        </div>
    )
})

Content.displayName = 'Content'