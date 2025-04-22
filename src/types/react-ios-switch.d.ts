declare module 'react-ios-switch' {
    import * as React from 'react';
  
    interface SwitchProps {
      checked?: boolean;
      disabled?: boolean;
      onChange?: (checked: boolean) => void;
      onColor?: string;
        offColor?: string;
      className?: string;
      style?: React.CSSProperties;
    }
  
    const Switch: React.FC<SwitchProps>;
  
    export default Switch;
  }
  