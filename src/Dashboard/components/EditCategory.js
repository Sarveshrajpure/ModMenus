import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./EditCategory.css";
import spinner from "../../assests/spinner.gif";
import { FetchCategory, FetchCategoryById } from "../menuActions";

const EditCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState({});
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const menuInfo = useSelector((state) =>
    state.User.loginInfo.menuInfo._id ? state.User.loginInfo.menuInfo : ""
  );

  useEffect(() => {
    async function getCategories() {
      try {
        setLoader(true);
        if (menuInfo._id) {
          let dataToBeSent = { menuId: menuInfo._id };
          let response = await FetchCategory(dataToBeSent);
          setCategories(response);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        setError(error.message);
      }
    }
    getCategories();
  }, [menuInfo._id]);

  useEffect(() => {
    async function getCategoryInfoById() {
      try {
        let dataToBeSent = selectedCategoriesId;
        let response = await FetchCategoryById(dataToBeSent);
        console.log(response);
      } catch (error) {}
    }
    getCategoryInfoById();
  }, [selectedCategoriesId]);
  return (
    <div className="editCategoryWrapper">
      {loader ? (
        <div className="flex justify-center">
          <img className="w-16" src={spinner} alt="spinner" />
        </div>
      ) : (
        <div className="editCategoryContent">
          <div className="EditCategoryTitle text-center text-2xl font-semibold">
            Edit Categories
          </div>
          <div className="text-center font-medium mt-2">
            Please select a catgeory to start editing
          </div>
          <div className="editCategorySelect flex justify-start mt-2 text-sm pl-5">
            <div className="text-lg px-1">Category:</div>
            <select
              className="p-1 ml-2 text-lg px-2"
              onChange={(e) => {
                setSelectedCategoriesId(e.target.value);
              }}
            >
              <option>Select a category</option>
              {categories.map((element, index) => (
                <option key={index} value={element._id}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>
          <div className="editCategoryForm">
            <form></form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
