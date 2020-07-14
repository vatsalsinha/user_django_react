import React from 'react';
import axios from 'axios';

class UserForm extends React.Component{
    state = {data: [], name: "", phone: ""}
    componentDidMount(){
        this.getUsers()
    }

    getUsers = () => {
        axios.get('http://127.0.0.1:8000/api/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(resp => {
            console.log(resp)
            this.setState({data: resp.data})
        })
    }

    renderUsers(){
        return(
            <div>
                {this.state.data.map(d => {
                   return  <li key = {d.id}>{d.name} - {d.phone}</li>
                })}
            </div>
        )
    }
    onFormSubmit = () => {
        var item = {'name': this.state.name, 'phone': this.state.phone}
        axios.post('http://127.0.0.1:8000/api/', item).then(res => this.getUsers())
        this.setState({ name: "", phone: ""})
    }
    render(){
        return(
            <div>
                UserForm
                <br />
                <label name = "name">Name  </label> 
                <input value = {this.state.name} onChange={e => this.setState({ name: e.target.value})}/>
                <br />
                <label name = "phone">Phone  </label>
                <input value = {this.state.phone} onChange = {e => this.setState({phone: e.target.value})} />
                <br />
                <button onClick = {this.onFormSubmit}>dump data to the database</button>
                <hr/>
                Current Users:
                {this.renderUsers()}
            </div>
        )
    }
}

export default UserForm;