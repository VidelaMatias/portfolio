import { FC } from "react";

interface props {
    error:string
}
export const ErrorMessage: FC<props> = ({error}) => {
    return (
        <div className="text-sm text-textError" aria-live="polite">
        {error}
        </div>
    )
}

export default ErrorMessage;