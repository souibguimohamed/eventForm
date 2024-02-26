import classnames from "classnames";
import * as React from "react";

import "./style.scss";

export default function Input(props: InputProps) {
    const [toggleCaption, setToggleCaption] = React.useState(false);
    const {
        reference,
        onKeyDown,

        //general props
        borderColor,
        borderWidth,
        className,
        disabled,
        id,
        inputWidth,
        maxLength,
        style,
        title,
        type,
        autoComplete,
    } = props;
    const {
        // caption props
        captionColor,
        captionIcon,
        captionSize,
        captionText,
        hintText,
        required,
    } = props;
    const {
        //input props
        iconImg,
        onClickIconImg,
        iconLocation,
        inputRadius,
        onChange,
        onBlur,
        defaultValue,
        placeholder,
        textColor,
        textSize,
        value,
        tags,
        inputBackgroundColor,
    } = props;
    const {
        // error props
        errorColor,
        errorIsActivated,
        errorSize,
        errorText,
    } = props;
    const [errorState, setErrorState] = React.useState(errorIsActivated);
    const [isDisabled] = React.useState(disabled);
    const [inputValue, setInputValue] = React.useState(value);
    React.useEffect(() => {
        setErrorState(errorIsActivated);
    }, [errorIsActivated]);
    React.useEffect(() => {
        setInputValue(value);
    }, [value]);

    const disabledColor = "#7f8c8d";
    const componentStyle = {
        captionStyle: {
            ...style?.captionStyle,
            color: !isDisabled ? captionColor : disabledColor,
            fontSize: captionSize,
            width: inputWidth ? inputWidth : undefined,
        },
        inputStyle: {
            width: inputWidth ? inputWidth : undefined,
            borderWidth: borderWidth,
            borderColor: !isDisabled
                ? !errorState
                    ? borderColor
                    : errorColor
                : disabledColor,
            borderRadius: inputRadius ? parseInt(inputRadius) : undefined,
            // paddingLeft: iconImg && iconLocation === "left" ? 30 : 3, //TODO: return
            // paddingRight: iconImg && iconLocation === "left" ? 3 : 30,
            fontSize: textSize,
            color: textColor,
            ...style?.inputStyle,
        },
        errorStyle: {
            ...style?.errorStyle,
            color: !isDisabled ? errorColor : disabledColor,
            fontSize: errorSize,
            width: inputWidth ? inputWidth : undefined,
        },
    };
    const handleInputChange = (event: any) => {
        event.preventDefault();
        setInputValue(event.target.value);
        onChange && onChange(event.target.value);
    };
    const handleInputBlur = (event: any) => {
        event.preventDefault();
        setInputValue(event.target.value);
        onBlur && onBlur(event.target.value);
    };
    const classProps: string = classnames("input", className);

    return (
        <div
            className='input-container'
            style={{
                width: inputWidth ? inputWidth : undefined,
            }}
        >
            {captionText && (
                <div
                    className='caption-container'
                    style={componentStyle.captionStyle}
                >
                    <label htmlFor={id}>
                        {captionText}
                        {required ? (
                            <span style={{ color: "red" }}> *</span>
                        ) : null}
                    </label>
                    {captionIcon && (
                        <div className='captionicon-container'>
                            {toggleCaption ? (
                                <>
                                    <div
                                        className='hint-container'
                                        onClick={() =>
                                            setToggleCaption(!toggleCaption)
                                        }
                                    >
                                        <p className='hint-text'>{hintText}</p>
                                    </div>
                                </>
                            ) : null}
                            <img
                                src={captionIcon}
                                alt=''
                                className={"caption-hint-icon"}
                                onClick={() => setToggleCaption(!toggleCaption)}
                            />
                        </div>
                    )}
                </div>
            )}
            <div
                className='input-field-container'
                style={{
                    flexDirection:
                        iconLocation !== "left" ? "row" : "row-reverse",
                    width: inputWidth ? inputWidth : undefined,
                    borderWidth: borderWidth,
                    borderColor: !isDisabled
                        ? !errorState
                            ? borderColor
                            : errorColor
                        : disabledColor,
                    borderRadius: inputRadius
                        ? parseInt(inputRadius)
                        : undefined,
                    ...style?.inputStyle,
                }}
            >
                <input
                    ref={reference}
                    onKeyDown={onKeyDown}
                    autoComplete={autoComplete}
                    disabled={isDisabled}
                    type={type}
                    id={id}
                    style={{
                        fontSize: textSize,
                        color: textColor,
                        width: "-webkit-fill-available",
                        borderRadius: inputRadius
                            ? parseInt(inputRadius)
                            : undefined,
                        backgroundColor: inputBackgroundColor,
                        outline: "none",
                        ...style?.inputCoreStyle,
                    }}
                    className={classProps}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    maxLength={maxLength}
                    value={inputValue || defaultValue}
                    defaultValue={defaultValue}
                    onBlur={handleInputBlur}
                />
                {iconImg && (
                    <img
                        onClick={onClickIconImg}
                        className='input-icon'
                        alt={title}
                        src={iconImg}
                    />
                )}
                {tags}
            </div>

            {errorState && (
                <label style={componentStyle.errorStyle} htmlFor={id}>
                    {errorText}
                </label>
            )}
        </div>
    );
}

interface InputProps {
    reference?: any;
    // general props
    onKeyDown?: any;
    borderColor?: string;
    borderWidth?: number;
    className?: string[];
    disabled?: boolean;
    id?: string;
    inputWidth?: string;
    style?: {
        captionStyle?: React.CSSProperties;
        errorStyle?: React.CSSProperties;
        inputStyle?: React.CSSProperties;
        inputCoreStyle?: React.CSSProperties;
    };
    title?: string;
    type?:
        | "text"
        | "password"
        | "email"
        | "search"
        | "date"
        | "time"
        | "number"
        | "checkbox";
    autoComplete: "on" | "off";
    // caption props
    captionColor?: string;
    captionIcon?: string; //if not exist then caption icon is disabled
    captionSize?: string;
    captionText?: string | null;
    maxLength?: number;
    hintText?: string;
    required?: boolean;
    // input props
    iconImg?: string;
    onClickIconImg?: React.MouseEventHandler<HTMLElement>;
    iconLocation?: "left" | "right";
    inputRadius?: string;
    onChange?: Function;
    onBlur?: Function;
    placeholder?: string;
    inputBackgroundColor?: string;
    textColor?: string;
    textSize?: number;
    value?: string | number;
    defaultValue?: string | number;
    tags?: React.ReactNode;
    // error props
    errorColor?: string;
    errorIsActivated?: boolean;
    errorSize?: number;
    errorText?: string;
}

Input.defaultProps = {
    disabled: false,
    autoComplete: "off",
    // general props
    borderColor: "black",
    borderWidth: 2,
    className: ["test"],
    id: "id-input",
    inputWidth: "auto",
    title: "input title",
    type: "text",
    // caption props
    captionColor: "#2980b9",
    captionSize: "16px",
    captionText: "This is an input caption",
    hintText: "This input is super amazing and wonderful",
    required: false,
    // input props
    inputRadius: "5px",
    placeholder: "placeholder",
    textColor: "#2c3e50",
    textSize: "16px",
    value: "",
    inputBackgroundColor: "transparent",
    tags: null,
    // error props
    errorIsActivated: false,
    onClickIconImg: () => {},
};
