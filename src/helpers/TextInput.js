import { TextField } from "@mui/material"

const TextInput = ({id, value, onChange, errorFields, label, type, multiline}) => {
    let error = false
    let errorText = ''

    if(!type){
        type = 'text'
    }

    if(errorFields && errorFields.detail){
        for(const field of errorFields.detail){
            if(field.loc[1]==id){
                errorText = field.msg
                error = true
            }
        }
    }

    return (
        <TextField
            error={error}
            id={id}
            label={label}
            helperText={errorText}
            value={value}
            onChange={onChange}
            type={type}
            sx={{
                marginY: 1,
            }}
            fullWidth
            multiline={multiline}
            rows={multiline ? 4 : 1}
        />
    );
}
 
export default TextInput;
