import React from 'react';
import {useBem} from '../../hooks/useBem';

import './Button.scss';

interface IButtonProps {
  label?: string,
  className?: string,
  children?: React.ReactNode,
  color?: string,
  size?: string,
  onClick?: (e: Event | React.MouseEvent) => Promise<any> | any,
  disabled?: boolean,
}

export default function Button(props: IButtonProps) {
  const bem = useBem('Button');

  return (
       <button
        className={bem.classNames([bem.block(), props.className])}
        onClick={props.onClick}
        disabled={props.disabled}
       >
          {props.label || null}
          {props.children}
       </button>
  );
}
