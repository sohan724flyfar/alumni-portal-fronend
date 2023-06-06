import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Chip from "../../components/Chip/Chip";
import "./register.css";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ EducationStatus: "finished" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      "https://alumni-portal-production-ceef.up.railway.app/alumni/registration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Account Created Successfully!",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/");
          });
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Server Down",
          confirmButtonText: "Please Try Again!",
        }).then(function () {});
      });

    e.target.reset();
  };

  const roles = [
    {
      title: "Student",
      value: "student",
      color: "green",
    },
    {
      title: "Faculty",
      value: "faculty",
      color: "orange",
    },
    {
      title: "Admin",
      value: "admin",
      color: "red",
    },
    {
      title: "Alumni",
      value: "alumni",
      color: "blue",
    },
  ];
  return (
    <section className="register">
      <div className="register-container" data-aos="zoom-in">
        <div className="register-content">
          <div className="register-title">
            <span>Sign Up</span>
            <button className="icon" onClick={() => navigate("/")}>
              <span className="material-icons">close</span>
            </button>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label>
                <span className="material-icons">person</span>
              </label>
              <input
                type="text"
                name="FirstName"
                value={user.FirstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <label>
                <span className="material-icons">person</span>
              </label>
              <input
                type="text"
                name="LastName"
                value={user.LastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <div className="register-form-group">
              <label>
                <span className="material-icons">location_city</span>
              </label>
              <input
                type="text"
                name="City"
                value={user.City}
                onChange={handleChange}
                placeholder="City Name"
              />
              <label>
                <span className="material-icons">flag</span>
              </label>
              <input
                type="text"
                name="Country"
                value={user.Country}
                onChange={handleChange}
                placeholder="Enter Country"
              />
            </div>
            <div className="register-form-group">
              <label>
                <span className="material-icons">phone</span>
              </label>
              <input
                type="text"
                name="PhoneNumber"
                value={user.PhoneNumber}
                onChange={handleChange}
                placeholder="Enter a valid phone Number"
              />
              <label>
                <span className="material-icons">person</span>
              </label>
              <input
                type="text"
                name="StudentId"
                value={user.StudentId}
                onChange={handleChange}
                placeholder="Enter Student Id"
              />
            </div>
            <div className="register-form-group">
              <label>
                <span className="material-icons">account_circle</span>
              </label>
              <input
                type="text"
                name="UniversityName"
                value={user.UniversityName}
                onChange={handleChange}
                placeholder="University Name"
              />
              <label>
                <span className="material-icons">email</span>
              </label>
              <input
                type="email"
                name="Email"
                value={user.Email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="register-form-group">
              <label>
                <span className="material-icons">school</span>
              </label>
              <input
                type="text"
                name="Department"
                value={user.Department}
                onChange={handleChange}
                placeholder="Department Name"
              />
              <label>
                <span className="material-icons">school</span>
              </label>
              <input
                type="text"
                name="EducationStatus"
                value={user.EducationStatus}
                onChange={handleChange}
                placeholder="Education Status"
              />
            </div>
            <div className="register-form-group">
              <label>
                <span className="material-icons">lock</span>
              </label>
              <input
                type="password"
                name="Password"
                value={user.Password}
                onChange={handleChange}
                placeholder="Password"
              />
              <label>
                <span className="material-icons">key</span>
              </label>
              <input
                type="password"
                name="ConfirmedPassword"
                value={user.ConfirmedPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>

            <div
              className="register-form-group register-form-radio"
              style={{
                justifyContent: "space-evenly",
              }}>
              <span className="register-form-radio-span">
                Choose your role:{" "}
              </span>
              {roles.map((role, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    onChange={handleChange}
                    placeholder={role.title}
                  />
                  <Chip
                    text={role.title}
                    color={role.color}
                    onClick={(e) => {
                      e.preventDefault();
                      setUser({
                        ...user,
                        role: role.value,
                      });
                    }}
                    variant={user.role === role.value ? "fill" : "outline"}
                  />
                </label>
              ))}
            </div>
            <div className="register-form-group">
              <Button
                text="Sign Up"
                color="brown"
                variant="fill"
                size="large"
                type="submit"
              />
            </div>
          </form>
          <div className="register-bottom">
            <span>Already have an account?</span>
            <Link to="/login">Log In</Link>
          </div>
        </div>
        <div className="register-background">
          <div className="register-background-shape register-background-shape__4"></div>
          <div className="register-background-shape register-background-shape__3"></div>
          <div className="register-background-shape register-background-shape__2"></div>
          <div className="register-background-shape register-background-shape__1"></div>
        </div>
      </div>
    </section>
  );
};

export default Register;
