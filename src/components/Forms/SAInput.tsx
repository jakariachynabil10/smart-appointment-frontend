/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  select?: boolean;
  children?: React.ReactNode;
  InputLabelProps?: any;
};

const SAInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  required,
  select = false,
  children,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue="" // ✅ ensures no "undefined value"
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value ?? ""} // ✅ prevents "undefined"
          onChange={(e) => field.onChange(e.target.value)} // ✅ handle select correctly
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          select={select}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default SAInput;
