import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import GlobalContext from "../Context/GloablContext";
import Popup from "../Popup/Popup";
import "./write-new-post.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const WriteNewPost = ({ close }) => {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);
  const [post, setPost] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    fetch(
      "https://alumni-portal-production-ceef.up.railway.app/alumni/eafb8f71-e90a-44dd-bca7-cf76d3ba5f0c/postmessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          //   setComplete(true);
          //   setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: "New Post Uploaded!",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        } else {
          throw new Error(data?.message);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Server Down",
          confirmButtonText: "Please Try Again!",
        }).then(function () {
          navigate(0);
        });
      });

    e.target.reset();
  };
  return (
    <Popup close={close} title="Create a new post" width="60%" height="60%">
      {/* <div className="write-new-post-body-top">
        <div className="write-new-post-body-avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
        <div className="write-new-post-body-name">
          <span>{user.name}</span>
          <span>{user.status}</span>
        </div>
      </div> */}
      <div className="write-new-post-body-content">
        <form onSubmit={handleSubmit}>
          <div style={{ width: "100%", margin: "10px 0px" }}>
            <input
              type="text"
              name="Title"
              value={user.Title}
              onChange={handleChange}
              placeholder="Give Post Title"
            />
          </div>
          <textarea
            placeholder="Write something here"
            name="Body"
            value={post.Body}
            onChange={handleChange}
            autoFocus></textarea>
          <Button text="Post" type="submit" />
        </form>
      </div>
    </Popup>
  );
};

export default WriteNewPost;
