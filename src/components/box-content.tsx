import { cn, formatNumber } from "@/lib/utils"
import { FC, memo } from "react"
import { CardDescription } from "./ui/card"


export const Content: FC<{ label: string, value?: string, color: string }> = memo(({ label, value = '', color }) => {
    const flexDirection = label.length > 18 ? 'flex-col' : 'flex-row'
    return (
        <div key={label} className={cn('flex gap-2 justify-between w-full', flexDirection)}>
            <span className={cn('capitalize font-bold', color)}>{label}</span>
            <CardDescription className={color}>{formatNumber(value)}</CardDescription>
        </div>
    )
})

Content.displayName = 'Content'