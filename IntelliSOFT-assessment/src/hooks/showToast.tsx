import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function showToast(isSuccess:boolean,message:string){
return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity= {isSuccess ? "success":"error"}>
          <AlertTitle>{isSuccess ? "Success":"Error"}</AlertTitle>
          {message}
    </Alert>
    </Stack>
);
  
}