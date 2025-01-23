import React from 'react';

export type NovaButtonProps = {
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  dataTarget?: string;
  disabled?: boolean;
  form?: string;
  datasets?: Record<string, any>;
  type?: string;
  buttonText?: string | undefined;
};

export const NovaButton = ({
  className = '',
  id = '',
  onClick = () => {},
  style = {},
  dataTarget = undefined,
  disabled = false,
  form = '',
  datasets = {},
  type = '',
  buttonText = 'Button',
}: NovaButtonProps) => {

    const getDatasets = Object.entries(datasets).map(([key, value])=>{
            return {[`data-${key}`] : value}
    })

  return (
    <button
      className={`btn bg-dark text-white ${className}`}
      id={id}
      onClick={onClick}
      style={style}
      data-bs-toggle={dataTarget != null ? "modal" : ""}
      data-bs-target={dataTarget}
    //   data-bs-dismiss={dataTarget != null ? "modal" : ""}
      disabled={disabled}
      type={type}
      form={form}
      {...Object.assign({}, ...getDatasets)}
    >
      {buttonText}
    </button>
  );
};
