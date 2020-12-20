type Colors = 'primary' | 'transparent'

export interface ButtonPropsI {
    onClick: () => void
    label: string
    color: Colors
    dataTestId?: string
}
