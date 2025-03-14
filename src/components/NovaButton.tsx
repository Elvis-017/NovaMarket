import React, { ReactNode } from 'react';

export type NovaButtonProps = {
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  dataTarget?: string;
  dataDismiss?: string;
  disabled?: boolean;
  form?: string;
  datasets?: Record<string, any>;
  type?: string;
  buttonText?: string | undefined | JSX.Element;
  icon?: ReactNode;
};

export const NovaButton = ({
  icon,
  className = '',
  id = '',
  onClick = () => {},
  style = {},
  dataTarget = undefined,
  dataDismiss = undefined,
  disabled = false,
  form = '',
  datasets = {},
  type = '',
  buttonText = ''
}: NovaButtonProps) => {

  const getDatasets = Object.entries(datasets).map(([key, value])=>{
    return {[`data-${key}`] : value}
  })

  return (
    <button
      className={`btn text-white ${className}`}
      id={id}
      onClick={onClick}
      style={style}
      data-bs-toggle={dataTarget != null ? "modal" : ""}
      data-bs-target={dataTarget}
      data-bs-dismiss={dataDismiss != null ? "modal" : ""}
      disabled={disabled}
      type={type}
      form={form}
      {...Object.assign({}, ...getDatasets)}
    >
     {icon} {buttonText}
    </button>
  );
};
