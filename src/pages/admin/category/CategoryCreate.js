import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LocalSearch from '../../../components/forms/localSearch';

import AdminNav from '../../../components/nav/AdminNav';
import {
  createCategory,
  getAllCategories,
  removeCategory,
  updateCategory,
} from '../../../functions/category';

const ReachableContext = React.createContext();

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modal, contextHolder] = Modal.useModal();

  // create category
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Model/Updating
  const [visible, setVisible] = useState(false);
  const [slug, setSlug] = useState('');
  const [newName, setNewName] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  // searching/filtering
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((res) => setCategories(res.data.categories));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!name.trim()) return message.error('Name required');
    setLoading(true);
    try {
      await createCategory(user.token, name);
      message.success('Category created');
      setLoading(false);
      setName('');
      loadCategories();
    } catch (err) {
      message.error(err.message ?? 'Something went wrong');
      setLoading(false);
    }
  };

  const handleRemove = async (slug) => {
    modal.confirm({
      title: 'Do you want to delete?',
      onOk: () => {
        removeCategory(slug, user.token)
          .then((res) => {
            message.success('Deleted');
            loadCategories();
          })
          .catch((err) => message.error(err.message ?? 'Something went wrong'));
      },
    });
  };

  const handleEdit = () => {
    setConfirmLoading(true);
    updateCategory(slug, user.token, newName)
      .then((res) => {
        setVisible(false);
        setConfirmLoading(false);
        loadCategories();
      })
      .catch((err) => {
        message.error('Something went wrong');
        setConfirmLoading(false);
      });
  };

  const openModel = (slug, name) => {
    setSlug(slug);
    setNewName(name);
    setVisible(true);
  };

  const searched = (keyword) => (c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase());

  const categoryForm = (
    <form className="form-group">
      <label className="form-label mt-2">Name</label>
      <Input
        value={name}
        autoFocus
        required
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSubmit} className="mt-3" size="large">
        {loading ? 'Saving...' : 'Create Category'}
      </Button>
    </form>
  );

  const categorylist = categories.filter(searched(keyword)).map((cat) => (
    <div className="alert alert-primary row" key={cat._id}>
      <div className="col-9 align-items-center d-flex">{cat.name}</div>
      <div className="col-3 align-items-center d-flex justify-content-end">
        <ReachableContext.Provider value="light">
          <Button
            onClick={() => openModel(cat.slug, cat.name)}
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
    </Modal>
  );

  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav selectKey="category" />
      </div>
      <div className="col-md-5 mt-2">
        <h4>Create category</h4>
        {categoryForm}
        <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        {categorylist}
      </div>
      {contextHolder}
      {editModel}
    </div>
  );
};

export default CategoryCreate;
