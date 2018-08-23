import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DatePicker } from 'material-ui-pickers';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({

  picker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,

  },
});

class RaporlarPickers extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    }
  }

  handleDateChange = name => date => {
    this.setState({ [name]: date });
  }

  onGetir = () => {
    this.props.onGetir(this.state.startDate, this.state.endDate);
  }

  render(){
    const {classes} = this.props;
    return (
      <Paper className={classes.root} >
      <Typography variant="headline">
        Tarihler arasındaki fisleri göster
      </Typography>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <DatePicker
              label="Başlangıç"
              value={this.state.startDate}
              onChange={this.handleDateChange('startDate')}
              animateYearScrolling={false}
              cancelLabel="Kapat"
              okLabel="Tamam"
            />
          </Grid>

          <Grid item xs={12}>
            <DatePicker
              label="Bitiş"
              value={this.state.endDate}
              onChange={this.handleDateChange('endDate')}
              animateYearScrolling={false}
              cancelLabel="Kapat"
              okLabel="Tamam"

            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="raised" color="primary" onClick={this.onGetir}>
              Getir
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}


export default withStyles(styles)(RaporlarPickers);
