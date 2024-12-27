import { data } from "autoprefixer";
import React, { Component } from "react";

export default class Car extends Component {
  constructor() {
    super();
    this.state = {
      model: "",
      price: "",
      year: "",
      photo: "",
      create_btn: true,
      updated_car_id: "",
      data: JSON.parse(localStorage.getItem("data")) || [],
    };
  }

  handleDelete = (id) => {
    const store = this.state.data.filter((el) => el.id != id);
    this.setState({
      data: store,
    });
    localStorage.setItem("data", JSON.stringify(store));
  };


  handleUpdate = (id) => {
    const updated_car = this.state.data.find((el) => el.id === id);
    if (updated_car) {
      this.setState({
        model: updated_car.model,
        price: updated_car.price,
        year: updated_car.year,
        photo: updated_car.photo,
        create_btn: false,
        updated_car_id: id,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { model, price, year, photo, create_btn, data, updated_car_id } =
      this.state;

    if (create_btn) {
      const newCar = {
        id: Date.now(),
        model,
        price,
        year,
        photo,
      };

      const updatedData = [...data, newCar];
      this.setState({
        data: updatedData,
        model: "",
        price: "",
        year: "",
        photo: "",
      });
      localStorage.setItem("data", JSON.stringify(updatedData));
    } else {
      const updatedData = data.map((el) =>
        el.id === updated_car_id ? { ...el, model, price, year, photo } : el
      );

      this.setState({
        data: updatedData,
        model: "",
        price: "",
        year: "",
        photo: "",
        create_btn: true,
        updated_car_id: "",
      });
      localStorage.setItem("data", JSON.stringify(updatedData));
    }
  };

  render() {
    return (
      <div className="flex">
        <div className="w-80 h-screen bg-slate-200 p-5">
          <form onSubmit={this.handleSubmit} action="">
            <input
              autoFocus
              value={this.state.model}
              onChange={(e) => this.setState({ model: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Model"
              type="text"
            />
            <input
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Price"
              type="number"
            />
            <input
              value={this.state.year}
              onChange={(e) => this.setState({ year: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Year"
              type="number"
            />
            <input
              value={this.state.photo}
              onChange={(e) => this.setState({ photo: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Photo"
              type="text"
            />
            <button className="w-full bg-slate-400">
              {" "}
              {this.state.create_btn ? "Create" : "Edit"}
            </button>
          </form>
        </div>
        <div className="p-5 flex flex-wrap gap-3 flex-1 items-start content-start">
          {this.state.data?.map((car) => (
            <div key={car.id} className="w-72 shadow-md ">
              <div className="w-full h-52 bg-slate-200">
                <img
                  className="w-full h-full bg-contain"
                  src={car.photo}
                  alt=""
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium">{car.model}</h3>
                <p className="line-clamp-1">{car.year}</p>
                <p className="font-medium">{car.price}</p>
                <div className="mt-3">
                  <button
                    onClick={() => this.handleDelete(car.id)}
                    className="bg-slate-400 px-4 py-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.handleUpdate(car.id)}
                    className="ml-2 bg-green-400 px-4 py-1"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
