import React, { memo, useState } from "react";
import { useCreateCategoryMutation } from "../../context/api/categoryApi";
import "../admin/admin.scss";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
};

const CategoryCreate = () => {
  const [handleCreate, { data }] = useCreateCategoryMutation();
  const [categoryData, setCategoryData] = useState(initialState);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const { title } = categoryData;
    await handleCreate({ title });
    setCategoryData(initialState);
    navigate("/admin/categoryManage");
  };

  return (
    <div className="category-create">
      <div>
        <h2 className="form-title">Create category</h2>
        <form onSubmit={handleCreateCategory} className="form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Category name
            </label>
            <input
              type="text"
              id="title"
              name="title" 
              value={categoryData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-button">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(CategoryCreate);
