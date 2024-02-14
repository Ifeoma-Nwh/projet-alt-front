import "../../assets/styles/components/FormInput.scss";

interface IProps {
  label: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  [key: string]: any;
}

export const FormInput: React.FC<IProps> = ({
  label,
  onChange,
  ...inputProps
}) => {
  return (
    <div className="formInput">
      {/* <label>{label}</label> */}
      {inputProps.type === "textarea" ? (
        <textarea
          {...inputProps}
          onChange={onChange}
          className="formInput__input"
        ></textarea>
      ) : (
        <input
          {...inputProps}
          onChange={onChange}
          className="formInput__input"
        />
      )}
    </div>
  );
};
