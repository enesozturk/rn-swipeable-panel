/// <reference types="react" />
declare type CloseProps = {
    onPress: () => void;
    rootStyle?: object;
    iconStyle?: object;
};
export declare const Close: ({ onPress, rootStyle, iconStyle }: CloseProps) => JSX.Element;
export {};
