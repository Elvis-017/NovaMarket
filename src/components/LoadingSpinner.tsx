
export type LoadingSpinnerProps = {
    width?: string | number;
    height?: string | number;
}

export const LoadingSpinner = ({
    width = "auto",
    height = "auto"
}: LoadingSpinnerProps) => {
    return (
        <div style={{ width: width, height: height }} className="text-center">
            <div className="spinner-border" role="status">
            </div>
        </div>
    )
}
