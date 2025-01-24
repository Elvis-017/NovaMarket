import { NovaButton } from './NovaButton'
import { NovaModal } from './NovaModal'

export type ConfirmNovaModalProps = {
    title: string,
    message: string,
    id: string,
    jsx: JSX.Element,
    form:string
}

export const ConfirmNovaModal = ({
    title,
    message,
    id,
    jsx,
    form

}: ConfirmNovaModalProps) => {
    return (
        <NovaModal
            id={id}
            title={title}
            headerColor='bg-danger'
            modalBody={
                <>
                    <span>{message}</span>
                    {jsx}

                </>
            } 
            modalFooter={
            <>
              <NovaButton
                id={`btn-${form}`}
                form={form}
                type='submit'
                buttonText='Yes'
                className='btn bg-danger '
              />

              <NovaButton
                type='button'
                dataDismiss="modal"
                buttonText='No'
                className='btn btn-secondary '
              />
            </>
            
            }
            />
    )
}
