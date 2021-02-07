import { Drawer, Form, Button, Input, Select, Radio } from 'antd';

import FileUpload from './FileUpload';

const { Option } = Select;

const ProductEditForm = ({
  visible,
  onClose,
  submitHandler,
  product,
  handleChange,
  handleCategoryChange,
  setProduct,
  subArray,
  setSubArray,
  fileList,
  setFileList,
  categories,
  subOptions,
}) => {
  return (
    <Drawer
      title="Edit Product"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => submitHandler(product)} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input
            value={product.title}
            onChange={handleChange}
            name="title"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            style={{ height: '15rem' }}
            value={product.description}
            onChange={handleChange}
            name="description"
            type="text"
          />
        </Form.Item>
      </Form>
      <Form layout="horizontal">
        <Form.Item style={{ width: 200 }} label="Price">
          <Input
            value={product.price}
            onChange={handleChange}
            addonBefore="₹"
            name="price"
            type="number"
          />
        </Form.Item>
        <Form.Item style={{ width: 200 }} label="Quantity">
          <Input
            value={product.quantity}
            onChange={handleChange}
            name="quantity"
            type="number"
          />
        </Form.Item>
        <Form.Item label="Shipping">
          <Select
            onChange={(val) => setProduct({ ...product, shipping: val })}
            value={product.shipping}
            style={{ width: 80, margin: '0 8px' }}
          >
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>
        {categories.length > 0 && (
          <Form.Item label="Category">
            <Select
              onChange={handleCategoryChange}
              placeholder="select category"
              defaultValue={product.category._id}
              value={product.category._id}
              style={{ width: 150, margin: '0 8px' }}
            >
              {categories.map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Sub Categories">
          <Select
            mode="multiple"
            allowClear
            onChange={(val) => setSubArray(val)}
            placeholder="select sub category"
            value={subArray}
            style={{ width: '100%', margin: '0 8px' }}
          >
            {subOptions.map((sub) => (
              <Option key={sub._id} value={sub._id}>
                {sub.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {product.color && (
          <Form.Item label="Color" name="color">
            <Radio.Group
              value={product.color}
              defaultValue={product.color}
              name="color"
              onChange={handleChange}
            >
              {product.colors.map((color) => (
                <Radio.Button key={color} value={color}>
                  {color}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        )}
        {product.brand && (
          <Form.Item label="Brand" name="brand">
            <Radio.Group
              value={product.brand}
              defaultValue={product.brand}
              name="brand"
              onChange={handleChange}
            >
              {product.brands.map((brand) => (
                <Radio.Button key={brand} value={brand}>
                  {brand}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        )}
        <FileUpload fileList={fileList} setFileList={setFileList} />
      </Form>
    </Drawer>
  );
};

export default ProductEditForm;
