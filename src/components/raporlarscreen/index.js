import React from 'react';
import RaporlarTable from './components/RaporlarTable';
import {getRequest} from '../../utils/fetch12';
import RaporlarPickers from './components/RaporlarPickers';
import SonucGosterir from './components/SonucGosterir'

class RaporlarScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      fetched: false,
    }
  }
  handleDateChange = (date) => {
    this.setState({ date: date});
  }


  render(){
    let total = 0;
    let payed = 0;
    if(this.state.fetched){
      this.state.fisler.forEach(fis => {
        total += fis.total;
        payed += fis.payed;
      })
    }

    return (
      <div>
        <RaporlarPickers onGetir = {this.handleRaporGetir}/>
        {
          this.state.fetched && <RaporlarTable fisler = {this.state.fisler}/>
        }
        {
          this.state.fetched &&
          <SonucGosterir total={total} payed={payed} />
        }
      </div>
    )
  }

  handleRaporGetir = (startDate, endDate) => {
    fetch(getRequest("/receipt/date/?start="+ startDate.format("D-MM-YYYY hh:mm:ss") + "&end=" + endDate.format("D-MM-YYYY hh:mm:ss")))
    .then(response => response.json())
    .then(json => {
      this.setState({
        fisler: json,
        fetched: true,
      })
    })
  }
}

export default RaporlarScreen;
