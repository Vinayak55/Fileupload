import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

class Filedetails extends Component {
  constructor(){
  super();
  this.state={
      data:[]
  };
}
fetchData(){
  fetch('http://localhost:8000/api/')
  .then(response=>response.json())
        .then((data)=>{
            this.setState({
                data:data
            });
        });
}
componentDidMount(){
  this.fetchData();
}
  deleteData(id){
    fetch('http://127.0.0.1:8000/api/'+id+'/',{
        method:'DELETE',
        body:JSON.stringify(this.state),
    })
    .then(response=>response)
    .then((data)=>{
        if(data){
            this.fetchData();
        }
    });
}
  render() {
    // const {uploadPercentage} = this.state;
    const empData=this.state.data;
    const rows=empData.map((emp)=>
    <tr key={emp.id}>
                <td>{emp.title}</td>
                <td><a href="{emp.image.url}" download="{emp.image.url}">{emp.image}</a></td>
                <td>
                    <button onClick={()=>this.deleteData(emp.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
    );
    return (
      <div className="Filedetails" class="col-sm-3 mr-3 mt-3">
        <table className="table table-bordered mt-2 ml-1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>File</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
      </div>
    );
  }
}

export default Filedetails;