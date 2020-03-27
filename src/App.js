import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

class App extends Component {

  baseUrl = "https://robot-monitoring-api-dev.azurewebsites.net/";
  
  state = {
    accounts: [],
    company: [],
    theData: [{
      account: {
        AccountTypeID: '',
        CompanyID: 1,
        EmailAddress: ''
      },
      activity: {
        AccountID: '',
        Action: ''
      }
    }],
    count: 0
  }

  componentWillMount(){
    axios.get(this.baseUrl+'api/accounts').then((response) => {
      this.setState({
        accounts: response.data
      })
    });

    //getting the company list returning an object
    axios.get(this.baseUrl+'api/companyList').then((response) => {
      this.setState({
        company: response.data
      })
   
    })

    axios.get()
  }

  edit = () => {
  }

  counting = (e) => {

    this.state.count++;
  }

  render() {
    let accounts = this.state.accounts.map((account) => {
      return (
        <tr key={account.id}>
          <td>{account.brandName}</td>
          <td>{account.username}</td>
          <td>{account.name}</td>
          <td>{account.accountType}</td>
          <td>
            <button className="btn btn-info" onClick={this.edit}>Edit</button>&nbsp;
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );


    })

    let companyDetails = this.state.company.map((companyName) => {
      return(
         <option key={companyName.ID} value={companyName.ID}>{companyName.companyName}</option>
      )
    })



    return (
      <div className="App container">
        <h4>{this.state.count}</h4>
        <button className="btn btn-success" onClick={this.counting}>Counting</button>
        <button type="button" className="btn btn-primary modalBtn" data-toggle="modal" data-target="#myModal">
            Open modal
          </button>


          <div className="modal fade" id="myModal">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
              

                <div className="modal-header">
                  <h4 className="modal-title">Modal Heading</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                <div className="form-group">
                        <label>Email Address</label>
                          <input type="text" className="form-control" id="email" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label>Company Name</label>
                    <select className="form-control" id="companyName" placeholder="Company Name">
                        {companyDetails}
                        <option></option>
                    </select  >
                    </div>
                    <div className="form-group">
                    <label>Access Type</label>
                    <select class="form-control drop" id="newUserAccessType">
                      <option value='1'>Master Developer</option>
                      <option value='2'>Developer</option>
                      <option value='3'>Master Administrator</option>
                  </select>
                    </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={this.addUser}>Submit</button>
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
                
              </div>
            </div>
          </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>BrandName</th>
              <th>Username</th>
              <th>Name</th>
              <th>Account Type</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {accounts}          
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
