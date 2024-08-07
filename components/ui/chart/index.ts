export { default as ChartTooltip } from './ChartTooltip.vue'
export { default as ChartSingleTooltip } from './ChartSingleTooltip.vue'
export { default as ChartLegend } from './ChartLegend.vue'
export { default as ChartCrosshair } from './ChartCrosshair.vue'

export function defaultColors(count: number = 3) {
    const thirdCount = Math.floor(count / 3)
    const remainder = count % 3

    const primaryCount = thirdCount + (remainder > 0 ? 1 : 0)
    const secondaryCount = thirdCount + (remainder > 1 ? 1 : 0)
    const mutedCount = thirdCount

    return [
        ...Array.from(Array(primaryCount).keys()).map(i => `hsl(var(--vis-primary-color) / ${1 - (0.7 / primaryCount) * i})`),
        ...Array.from(Array(secondaryCount).keys()).map(i => `hsl(var(--vis-secondary-color) / ${1 - (0.7 / secondaryCount) * i})`),
        ...Array.from(Array(mutedCount).keys()).map(i => `hsl(var(--vis-muted-color) / ${1 - (0.7 / mutedCount) * i})`),
    ]
}

export * from './interface'