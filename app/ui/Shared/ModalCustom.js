import { Button, Dialog, DialogTitle, Grid } from "@mui/material";

export default function ModalCustom({ open, setOpen, title, body }) {
  return (
    <Dialog 
      onClose={(event, reason) => {
        reason !== 'backdropClick' ? setOpen(false) : setOpen(true)
      }} 
      open={open} 
      fullWidth 
      disableEscapeKeyDown  
      maxWidth="md"
    >
      <DialogTitle>
        <Grid container spacing={1}>
          <Grid item xs={10}>{title}</Grid>
          <Grid item xs={2}>
            <Button onClick={() => setOpen(false)}>
              X
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      {body}
    </Dialog>
  );
}
