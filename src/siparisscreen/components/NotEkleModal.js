import React from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const middle = {
  position: "fixed", /* or absolute */
  top: "25vh",
  left: "20vw",

};

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: "60vw",

    paddingLeft: "5vw",
  },

  textfield: {
    width: "50vw",
  },
  button: {
    marginRight: "2vw",
    width: "10vw",
    marginBottom: "5vh",
  }
});

class NotEkleModal extends React.Component{

  constructor(props){
    super(props);
    this.note = "";
  }


  render(){

    const {classes} = this.props;


    return(
      <Modal
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         open={this.props.open}
         onClose={this.props.handleClose}
       >
        <div style={middle} className={classes.paper}>
          {
          this.props.selectedLine &&
            <p>  {this.props.selectedLine.not} </p>
          }
         <TextField
            id="multiline-static"
            label="Not Ekle"
            multiline
            rows="4"
            margin="normal"
            className={classes.textfield}
            onChange={(event) => { this.note = event.target.value}}
          />
          <Button variant="raised" color="primary" className={classes.button} onClick={() => this.props.handleKaydet(this.note)}>
            Kaydet
          </Button>
          <Button variant="raised" color="secondary" className={classes.button} onClick={this.props.handleClose}>
            Kapat
          </Button>
        </div>
       </Modal>
    )
  }
}

export default withStyles(styles)(NotEkleModal);
