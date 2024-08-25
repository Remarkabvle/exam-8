import React, { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../context/api/categoryApi";
import {
  useGetProductsByCategoryQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../context/api/productApi";
import Products from "../../components/products/Products";
import EditModule from "../../components/editModule/EditModule";
import { Select, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ProductManage = () => {
  const { data } = useGetCategoriesQuery();
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [limit, setLimit] = useState(8);
  const navigate = useNavigate();

  const { data: productsData, isFetching, isLoading } = useGetProductsByCategoryQuery(category);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEdit(true);
  };

  const handleUpdate = async (updatedProduct) => {
    await updateProduct({ id: selectedProduct._id, body: updatedProduct });
    setShowEdit(false);
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  const handleUpdateImages = async (productId, newImages) => {
    await updateProduct({ id: productId, body: { urls: newImages } });
  };

  return (
    <div className="product-manage">
      <div className="filter">
        <Select
          className="filter-select"
          value={category}
          onChange={(value) => setCategory(value)}
        >
          <Select.Option value="all">All</Select.Option>
          {data?.payload?.map((el) => (
            <Select.Option key={el._id} value={el._id}>
              {el.title}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Products
        adminData={productsData}
        wishlistData={productsData}
        isAdmin={true}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {showEdit && (
        <Modal
          visible={showEdit}
          title="Edit Product"
          footer={null}
          onCancel={() => setShowEdit(false)}
          className="edit-module-modal"
        >
          <EditModule
            data={selectedProduct}
            onUpdate={handleUpdate}
            setShowEditModule={setShowEdit}
            onUpdateImages={handleUpdateImages}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductManage;
