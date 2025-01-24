import { Modal } from 'bootstrap'

export type ModalProps = {
    title?: string,
    modalBody?: JSX.Element,
    modalFooter?: JSX.Element | undefined,
    id?: string,
    headerColor?: string
}

export const NovaModal = ({
    title = 'modal',
    modalBody = <></>,
    modalFooter = undefined,
    id = "",
    headerColor = 'bg-dark'

}: ModalProps) => {
    return (
        <div className="modal fade" id={id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className={`modal-header text-white  ${headerColor}`}>
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {modalBody}
                    </div>

                    {modalFooter != undefined && <div className="modal-footer">
                        {modalFooter}
                    </div>}

                </div>
            </div>
        </div>
    )
}
