import React from 'react';
import {Text, Image} from "react";
import ReactDOM from 'react-dom';
import SkyLight from 'react-skylight';
import $ from 'jquery';
 
class App extends React.Component {
    constructor(props) {
        super(props);
        this.deleteGuitar = this.deleteGuitar.bind(this);
        this.createGuitar = this.createGuitar.bind(this);
        this.updateGuitar = this.updateGuitar.bind(this);

        this.state = {
            guitars: []
        };
    }

    componentDidMount() {
        this.loadGuitarsFromServer();
    }

    loadGuitarsFromServer() {
        fetch('http://localhost:8080/api/guitars', {
            credentials: 'same-origin'
        }).then((response) => response.json()).then((responseData) => {
            this.setState({
                guitars: responseData._embedded.guitars
            });
        });
    }

    deleteGuitar(guitar) {
        fetch(guitar._links.self.href, {
            method: 'DELETE',
            credentials: 'same-origin'
        })
            .then(res => this.loadGuitarsFromServer()
            )
            .catch(err => console(err))
    };

    createGuitar(guitar) {
        fetch('http://localhost:8080/api/guitars',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guitar)
            })
            .then(
                res => this.loadGuitarsFromServer()
            )
            .catch(err => console.error(err))
    }

    updateGuitar(guitar) {
        fetch(guitar.link,
            {
                method: 'PUT',
                credentials: 'same-origins',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guitar)
            })
            .then(
                res => this.loadGuitarsFromServer()
            )
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                <GuitarTable
                    deleteGuitar={this.deleteGuitar}
                    updateGuitar={this.updateGuitar}
                    guitars={this.state.guitars}
                />
                <GuitarForm
                    createGuitar={this.createGuitar}/>
            </div>
        );
    }
}

class GuitarTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var guitars = this.props.guitars.map(guitar =>
            <Guitar key={guitar._links.self.href} guitar={guitar} updateGuitar={this.props.updateGuitar}
                    deleteGuitar={this.props.deleteGuitar}/>
        );

        return (
            <table className="table table-striped">
                <tbody>
                <tr>
                    <th>modelname</th>
                    <th>series</th>
                    <th>strings</th>
                    <th>price</th>
                </tr>
                {guitars}
                </tbody>
            </table>
        );
    }
}

class Guitar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editShow: false};
        this.deleteGuitar = this.deleteGuitar.bind(this);
    }

    deleteGuitar() {
        this.props.deleteGuitar(this.props.guitar);
    }

    render() {
        return (
            <tr>
                <td>{this.props.guitar.modelname}</td>
                <td>{this.props.guitar.series}</td>
                <td>{this.props.guitar.strings}</td>
                <td>{this.props.guitar.price}</td>
                <td>
                    <GuitarUpdateForm guitar={this.props.guitar} updateGuitar={this.updateGuitar}/>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.deleteGuitar}>Delete</button>
                </td>
            </tr>
        );
    }
}

class GuitarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modelname: '', series: '', strings: '', price: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Model name: " + this.state.modelname);
        var newGuitar = {
            modelname: this.state.modelname,
            series: this.state.series,
            strings: this.state.strings,
            price: this.state.price,
        };
        this.props.createGuitar(newGuitar);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Create guitar</div>
                <div className="panel-body">
                    <form className="form-inline">
                        <div className="col-md-2">
                            <input type="text" placeholder="modelname" className="form-control" name="modelname"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2">
                            <input type="text" placeholder="series" className="form-control" name="series"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2">
                            <input type="text" placeholder="strings" className="form-control" name="strings"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2">
                            <input type="integer" placeholder="price" className="form-control" name="price"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

class GuitarUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelname: this.props.guitar.modelname,
            series: this.props.guitar.series,
            strings: this.props.guitar.strings,
            price: this.props.guitar.price
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Model name: " + this.state.modelname);
        var uGuitar = {
            link:
            this.props.guitar._links.self.href,
            modelname: this.state.modelname,
            series: this.state.series,
            strings: this.state.strings,
            price: this.state.price
        };
        this.props.updateGuitar(uGuitar);
        this.refs.editDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="editDialog">
                    <div className="panel panel-default">
                        <div className="panel-heading">Update Guitar</div>
                        <div className="panel-body">
                            <form className="form-inline">
                                <div className="col-md-2">
                                    <input type="text" placeholder="modelname" className="form-control" name="modelname"
                                           value={this.state.modelname}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="col-md-2">
                                    <input type="text" placeholder="series" className="form-control" name="series"
                                           value={this.state.series}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="col-md-2">
                                    <input type="text" placeholder="strings" className="form-control" name="strings"
                                           value={this.state.strings}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="col-md-2">
                                    <input type="integer" placeholder="price" className="form-control" name="price"
                                           value={this.state.price}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-success" onClick={this.handleSubmit}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SkyLight>
                <div>
                    <button className="btn btn-success" onClick={() => this.refs.editDialog.show()}>Edit</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));