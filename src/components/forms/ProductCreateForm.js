import React from 'react';
import { Button, Input, Select, Radio, Form } from 'antd';

import FileUpload from './FileUpload';

const { Option } = Select;

const ProductCreateForm = ({
  values,
  handleChange,
  setValues,
  handleSubmit,
  handleCategoryChange,
  subOptions,
  fileList,
  setFileList,
}) => {
  return (
    <>
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input
            value={values.title}
            onChange={handleChange}
            name="title"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={values.description}
            onChange={handleChange}
            name="description"
            type="text"
          />
        </Form.Item>
      </Form>
      <Form layout="horizontal">
        <Form.Item style={{ width: 200 }} label="Price">
          <Input
            value={values.price}
            onChange={handleChange}
            addonBefore="₹"
            name="price"
            type="number"
          />
        </Form.Item>
        <Form.Item style={{ width: 200 }} label="Quantity">
          <Input
            value={values.quantity}
            onChange={handleChange}
            name="quantity"
            type="number"
          />
        </Form.Item>
        <Form.Item label="Shipping">
          <Select
            onChange={(val) => setValues({ ...values, shipping: val })}
            value={values.shipping}
            style={{ width: 80, margin: '0 8px' }}
          >
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category">
          <Select
            onChange={handleCategoryChange}
            placeholder="select category"
            value={values.category === '' ? null : values.category}
            style={{ width: 150, margin: '0 8px' }}
          >
            {values.categories.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {subOptions && subOptions.length > 0 && (
          <Form.Item label="Sub Categories">
            <Select
              mode="multiple"
              allowClear
              onChange={(val) => setValues({ ...values, subs: val })}
              placeholder="select sub category"
              value={values.subs === [] ? null : values.subs}
              style={{ width: '100%', margin: '0 8px' }}
            >
              {subOptions.map((sub) => (
                <Option key={sub._id} value={sub._id}>
                  {sub.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Color" name="color">
          <Radio.Group
            value={values.color}
            name="color"
            onChange={handleChange}
          >
            {values.colors.map((color) => (
              <Radio.Button value={color}>{color}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Brand" name="brand">
          <Radio.Group
            value={values.brand}
            name="brand"
            onChange={handleChange}
          >
            {values.brands.map((brand) => (
              <Radio.Button value={brand}>{brand}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <FileUpload fileList={fileList} setFileList={setFileList} />
        <Form.Item>
          <Button
            className="mt-3"
            size="large"
            onClick={handleSubmit}
            style={{ width: '100%' }}
          >
            SAVE
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductCreateForm;
