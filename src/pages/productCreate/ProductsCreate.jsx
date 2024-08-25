import React, { useState } from "react";
import { useCreateProductMutation } from "../../context/api/productApi";
import { useGetCategoriesQuery } from "../../context/api/categoryApi";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import "../admin/admin.scss";

const { TextArea } = Input;
const { Option } = Select;

const ProductCreateForm = () => {
  const [formState, updateFormState] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    categoryId: "",
    rating: "",
    stock: "",
    photos: [],
    units: "",
  });

  const { data: categories } = useGetCategoriesQuery();
  const [submitProduct] = useCreateProductMutation();
  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    updateFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = ({ fileList }) => {
    updateFormState((prev) => ({
      ...prev,
      photos: fileList,
    }));
  };

  const submitForm = async () => {
    const productFormData = new FormData();
    Object.keys(formState).forEach((key) => {
      if (key === "photos") {
        formState.photos.forEach(({ originFileObj }) => {
          productFormData.append("photos", originFileObj);
        });
      } else {
        productFormData.append(key, formState[key]);
      }
    });

    try {
      await submitProduct(productFormData).unwrap();
      updateFormState({
        title: "",
        description: "",
        price: "",
        oldPrice: "",
        categoryId: "",
        rating: "",
        stock: "",
        photos: [],
        units: "",
      });
      navigateTo("/admin/productManage");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const inputStyles = {
    maxWidth: "500px",
    width: "100%",
  };

  return (
    <div className="product-create-container" style={{maxWidth: '450px'}}>
      <Form
        layout="vertical"
        onFinish={submitForm}
        initialValues={formState}
        className="product-create-form"
      >
        <Form.Item
          label="Product Title"
          name="title"
          rules={[{ required: true, message: "Please provide a title" }]}
        >
          <Input
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            style={inputStyles}
          />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: "Please provide a description" }]}
        >
          <TextArea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            style={inputStyles}
          />
        </Form.Item>

        <Form.Item
          label="Price (in USD)"
          name="price"
          rules={[{ required: true, message: "Please provide a price" }]}
        >
          <InputNumber
            name="price"
            value={formState.price}
            onChange={(value) => handleSelectChange(value, "price")}
            style={inputStyles}
          />
        </Form.Item>

        <Form.Item
          label="Old Price"
          name="oldPrice"
          rules={[{ required: true, message: "Please provide the old price" }]}
        >
          <InputNumber
            name="oldPrice"
            value={formState.oldPrice}
            onChange={(value) => handleSelectChange(value, "oldPrice")}
            style={inputStyles}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            value={formState.categoryId}
            onChange={(value) => handleSelectChange(value, "categoryId")}
            style={inputStyles}
          >
            <Option value="">Select a Category</Option>
            {categories?.payload?.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please select a rating" }]}
        >
          <Select
            value={formState.rating}
            onChange={(value) => handleSelectChange(value, "rating")}
            style={inputStyles}
          >
            <Option value="">Select Rating</Option>
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rate) => (
              <Option key={rate} value={rate}>
                {rate} <FaStar /> star(s)
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="stock"
          rules={[{ required: true, message: "Please provide the stock quantity" }]}
        >
          <InputNumber
            name="stock"
            value={formState.stock}
            onChange={(value) => handleSelectChange(value, "stock")}
            style={inputStyles}
          />
        </Form.Item>

        <Form.Item
          label="Units"
          name="units"
          rules={[{ required: true, message: "Please select the units" }]}
        >
          <Select
            value={formState.units}
            onChange={(value) => handleSelectChange(value, "units")}
            style={inputStyles}
          >
            <Option value="">Select Units</Option>
            <Option value="kg">kg</Option>
            <Option value="m">m</Option>
            <Option value="litr">litr</Option>
            <Option value="dona">dona</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Photos"
          name="photos"
          rules={[{ required: true, message: "Please upload product photos" }]}
        >
          <Upload
            listType="picture"
            multiple
            beforeUpload={() => false}
            onChange={handleFileUpload}
            style={inputStyles}
          >
            <Button icon={<UploadOutlined />}>Upload Photos</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" styles={inputStyles} style={{backgroundColor: 'black'}}>
            Submit Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(ProductCreateForm);
