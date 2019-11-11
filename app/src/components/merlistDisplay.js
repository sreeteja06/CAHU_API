import React, {Component} from 'react'
import '../styles/meritList.css'
import Axios from 'axios';

export default class MeritList extends Component{
    constructor(){
        super();
        this.state={
          mer:[]
        };
    }
    componentDidMount(){

        Axios.get('http://localhost:4003/mer/getAllocations')
        .then(resp=>{
          this.setState({mer:resp.data})
          console.log(resp.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
          <div>
            <div className='container'>
              <nav className="navbar bg-primary navbar-dark py-md-0" id='sidebar'>
                <a className="navbar-brand" href="/">Home</a>
                <a className="navbar-brand" href="/" style={{marginRight:'2px'}}>Merit List</a>
              </nav>
            </div>
            <br/><br/>
            <div className='container'>
              <div className="card">
                <div className="card-body">
                      { <table className="table table-striped table-responsive-sm">
                        <thead>
                          <tr>
                          <th className='text-center'>ID</th>
                          <th className='text-center'>Name</th>
                          <th className='text-center'>Total Score</th>
                          <th className='text-center'>email</th>
                          </tr>
                            {this.state.mer.map((res,ind)=>{
                            return(
                              <tr key={ind}>
                              <th className='text-center'>{ind}</th>
                              <th className='text-center'>{res.name}</th>
                              <th className='text-center'>{res.totalScore}</th>
                              <th className='text-center'>{res.email}</th>
                              </tr>
                            )
                            })}
                        </thead>
                        <tbody> 
                                        
                        </tbody>
                      </table> 
                          }                    
                </div>       
              </div>
            </div>
            </div>
        )
    }
}
