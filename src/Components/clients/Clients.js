import React, { Component } from "react";
import ClientList from "../clientList/ClientList";
import ClientsForm from "../clientsForm/ClientsForm";
import Filter from "../filter/Filter";
import axios from "axios";
import {
  addALLClients,
  addClient,
  deleteClient,
} from "../../redux/clients/clientsReducer/clientsAction";
import { doFilter } from "../../redux/clients/filterReducer/filterAction";
import { connect } from "react-redux";
import { ClientStyled } from "./ClientStyled";

class Clients extends Component {
  // state = {
  //   contacts: [],
  //   filter: "",
  // };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://shop-a2177-default-rtdb.firebaseio.com/clients.json`
      );
      if (response.data) {
        const contactsObj = Object.keys(response.data).map((key) => ({
          ...response.data[key],
          id: key,
        }));

        console.log(contactsObj);
        this.props.addALLClients(contactsObj);
        // this.setState({ contacts: contactsObj });
      } else return;
    } catch (error) {}
  }

  addClient = async (client) => {
    try {
      const response = await axios.post(
        `https://shop-a2177-default-rtdb.firebaseio.com/clients.json`,
        client
      );
      this.props.addClient({ ...client, id: response.data.name });
      // this.setState((prevState) => ({
      //   contacts: [
      //     ...prevState.contacts,
      //     { ...client, id: response.data.name },
      //   ],
      // }));
    } catch (error) {}
  };

  deleteClient = async (e) => {
    try {
      let { id } = e.target;
      await axios.delete(
        `https://shop-a2177-default-rtdb.firebaseio.com/clients/${id}.json`
      );
      this.props.deleteClient(id);
      // this.setState({
      //   contacts: this.state.contacts.filter((el) => el.id !== id),
      // });
    } catch (error) {}
  };

  getFilter = () => {
    return this.props.contacts.items.filter((contact) =>
      contact.name
        .toLowerCase()
        .includes(this.props.contacts.filter.toLowerCase())
    );
  };

  doFilter = (e) => {
    const { value } = e.target;
    this.props.doFilter(value);
    // this.setState({ filter: value });
  };

  onCheckRepeated = (name) => {
    return this.props.contacts.items.some((contact) => contact.name === name);
  };

  render() {
    console.log(this.props.contacts);
    return (
      <>
        <ClientStyled>Phonebook</ClientStyled>
        <ClientsForm
          addClient={this.addClient}
          onCheckRepeated={this.onCheckRepeated}
        />

        <Filter doFilter={this.doFilter} filter={this.props.contacts.filter} />
        <h2>Contacts:</h2>
        <ClientList
          clients={this.getFilter()}
          deleteClient={this.deleteClient}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: {
    items: state.contacts.items,
    filter: state.contacts.filter,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addALLClients: (items) => {
      dispatch(addALLClients(items));
    },
    addClient: (items) => {
      dispatch(addClient(items));
    },
    deleteClient: (items) => {
      dispatch(deleteClient(items));
    },
    doFilter: (filter) => {
      dispatch(doFilter(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
