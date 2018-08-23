import React, { Component } from 'react';
import './App.css';
import MasalarScreen from './masalarscreen/';
import SiparisScreen from './siparisscreen/';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter as Router, Route}  from 'react-router-dom';
import CounterScreen from './counterscreen';
import ApplicationBar from './components/appbar'
import KategoriDuzenle from './components/kategoriduzenle';
import KullaniciDuzenle from './components/kullaniciduzenle';
import MasalarDuzenle from './components/masalarduzenle';
import MasaYerleriDuzenle from './components/masayerleriduzenle';
import UrunlerDuzenle from './components/urunlerduzenle';
import OdemeScreen from './components/odemescreen';
import RaporlarScreen from './components/raporlarscreen';
import {getRequest, postRequest} from './utils/fetch12'
import 'moment/locale/tr'; // this is the important bit, you have to import the locale your'e trying to use.
import UserContext from './components/usercontext';


/* eslint-disable */
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {
        "id": 85,
          "name": "seko",
          "username": null,
          "isOnline": false,
          "image": null,
          "lastLogin": null,
          "roles": [
              "ROLE_GARSON"
          ]
      }
    }

  }

  componentWillMount(){
    this.getUser();
  }

  render() {
    return (

    <MuiPickersUtilsProvider utils={MomentUtils } locale="tr">
      <React.Fragment>
        <CssBaseline />
        {/* The rest of your application */}
          <UserContext.Provider value={this.state.user}>
            <Router>
              <div>
                <ApplicationBar />
                <Route exact path="/" component={MasalarScreen}/>
                <Route exact path="/siparis/:id/" component={SiparisScreen}/>
                <Route exact path="/counter" component={CounterScreen}/>
                <Route exact path="/kategoriduzenle" component={KategoriDuzenle}/>
                <Route exact path="/kullaniciduzenle" component={KullaniciDuzenle}/>
                <Route exact path="/masalarduzenle" component={MasalarDuzenle}/>
                <Route exact path="/masayerleriduzenle" component={MasaYerleriDuzenle}/>
                <Route exact path="/urunlerduzenle" component={UrunlerDuzenle}/>
                <Route exact path="/odemeler/:id" component={OdemeScreen}/>
                <Route exact path="/raporlarscreen" component={RaporlarScreen}/>
              </div>
            </Router>
          </UserContext.Provider>

      </React.Fragment>
    </MuiPickersUtilsProvider>

    )
  }


  tryLogin = (user) => {
    fetch(postRequest("/user/login", user))
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }

  getProduct = () => {

  }

  getUser = () => {
    fetch(getRequest("/user/auth"))
    .then(response => response.json())
    .then(json => this.setState({
      user: json,
    }))
    .catch(error => console.log(error));

  }
}

export default App;
