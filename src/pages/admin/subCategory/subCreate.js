import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Select, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import LocalSearch from '../../../components/forms/localSearch';
import AdminNav from '../../../components/nav/AdminNav';
import {
  createSubCategory,
  getAllSubCategories,
  removeSubCategory,
  updateSubCategory,
} from '../../../functions/sub';
import { getAllCategories } from '../../../functions/category';

const { Option } = Select;

const ReachableContext = React.createContext();

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modal, contextHolder] = Modal.useModal();

  // create category
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Model/Updating
  const [visible, setVisible] = useState(false);
  const [slug, setSlug] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  // searching/filtering
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((res) => setCategories(res.data.categories));

  const loadSubCategories = () =>
    getAllSubCategories().then((res) =>
      setSubCategories(res.data.subCategories)
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!name.trim()) return message.error('Name required');
    if (!category.trim()) return message.error('Select a category');
    setLoading(true);
    try {
      await createSubCategory(user.token, name, category);
      message.success('Sub category created');
      setLoading(false);
      setName('');
      setCategory('');
      loadSubCategories();
    } catch (err) {
      message.error(err.message ?? 'Something went wrong');
      setLoading(false);
    }
  };

  const handleRemove = async (slug) => {
    modal.confirm({
      title: 'Do you want to delete?',
      onOk: () => {
        removeSubCategory(slug, user.token)
          .then((res) => {
            message.success('Deleted');
            loadSubCategories();
          })
          .catch((err) => message.error(err.message ?? 'Something went wrong'));
      },
    });
  };

  const handleEdit = () => {
    if (!newName || !newCategory)
      return message.error('All fields are required');
    setConfirmLoading(true);
    updateSubCategory(slug, user.token, newName, newCategory)
      .then((res) => {
        setVisible(false);
        setConfirmLoading(false);
        loadSubCategories();
      })
      .catch((err) => {
        message.error('Something went wrong');
        setConfirmLoading(false);
      });
  };

  const openModel = (slug, name, cat) => {
    setSlug(slug);
    setNewName(name);
    setNewCategory(cat);
    setVisible(true);
  };

  const onDropDownSelected = (val) => {
    visible ? setNewCategory(val) : setCategory(val);
  };

  const searched = (keyword) => (c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase());

  const dropDown = (
    <Select
      showSearch
      value={visible ? newCategory : category}
      className="ml-3"
      style={{ width: 200 }}
      placeholder="Select a category"
      optionFilterProp="children"
      onChange={onDropDownSelected}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {categories.map((cat) => (
        <Option value={cat._id}>{cat.name}</Option>
      ))}
    </Select>
  );

  const subCategoryForm = (
    <form className="form-group">
      <label className="form-label mt-2">Name</label>
      <Input
        value={name}
        autoFocus
        required
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <label className="m-0 mt-3 text-small">
        Category :<span>{dropDown}</span>
      </label>
      <br />
      <Button
        disabled={loading}
        className="mt-3"
        onClick={handleSubmit}
        size="large"
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );

  const subCategorylist = subCategories.filter(searched(keyword)).map((cat) => (
    <div className="alert alert-warning row" key={cat._id}>
      <div className="col-9 align-items-center d-flex">{cat.name}</div>
      <div className="col-3 align-items-center d-flex justify-content-end">
        <ReachableContext.Provider value="light">
          <Button
            onClick={() => openModel(cat.slug, cat.name, cat.parent)}
            type="circle"
            icon={<EditOutlined />}
          ></Button>
          <Button
            className="ml-1"
            type="circle"
            onClick={() => handleRemove(cat.slug)}
            icon={<DeleteOutlined style={{ color: 'red' }} />}
          ></Button>
        </ReachableContext.Provider>
      </div>
    </div>
  ));

  const editModel = (
    <Modal
      title="Edit Category"
      visible={visible}
      onOk={handleEdit}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}
    >
      <Input
        value={newName}
        required
        placeholder="Enter category name"
        type="text"
        onChange={(e) => setNewName(e.target.value)}
      />
      <label className="m-0 mt-3 text-small">
        Category :<span>{dropDown}</span>
      </label>
    </Modal>
  );

  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav selectKey="subCategory" />
      </div>
      <div className="col-md-5 mt-2">
        <h4>Create sub category</h4>
        {subCategoryForm}
        <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        {subCategorylist}
      </div>
      {contextHolder}
      {editModel}
    </div>
  );
};

export default SubCreate;
