import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false); 
  const [postsData, setPostsData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", views: "" });
  const [updatePost, setUpdatePost] = useState({ id: "", title: "", views: "" }); 

  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleUpdateOpen = (id) => {
    const post = postsData.find((post) => post.id === id);
    setUpdatePost(post);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/posts");
      setPostsData(result.data);
      const rowsArray = result.data.map((post) => ({
        id: post.id,
        title: post.title,
        views: post.views,
      }));
      setRows(rowsArray);
      console.log("Fetched Data:", result.data);
      console.log("Rows:", rowsArray);
    } catch (error) {
      console.error("Error fetching Posts data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "views", headerName: "Views", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      renderCell: (params) => (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => navigate(`/books/${params.row.id}`)}>
            Detail
          </Button>
          <Button color="warning" onClick={() => handleUpdateOpen(params.row.id)}>
            Update
          </Button>
          <Button color="error" onClick={() => handleClickOpen(params.row.id)}>
            Delete
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  const handleDetail = (id) => {
    // Implement detail logic here
  };

  const handleUpdate = async () => {
    try {
      const result = await axios.put(`http://localhost:3000/posts/${updatePost.id}`, updatePost);
      const updatedRows = rows.map((row) => row.id === updatePost.id ? result?.data : row);
      setRows(updatedRows);
      setUpdateOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      newPost.id = Math.floor(Math.random() * 1000000).toString();
      console.log(newPost);
      const result = await axios.post("http://localhost:3000/posts", newPost);
      setRows([...rows, result.data]);
      setCreateOpen(false);
      setNewPost({ title: "", views: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div style={{ marginBottom: "16px" }}>
        <Button variant="contained" color="primary" onClick={handleCreateOpen}>
          Add New Post
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleDelete(selectedId)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={createOpen}
        onClose={handleCreateClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="views"
            label="Views"
            type="number"
            fullWidth
            value={newPost.views}
            onChange={(e) => setNewPost({ ...newPost, views: e.target.value })}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreatePost} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={updateOpen}
        onClose={handleUpdateClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={updatePost?.title}
            onChange={(e) =>
              setUpdatePost({ ...updatePost, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="views"
            label="Views"
            type="number"
            fullWidth
            value={updatePost?.views}
            onChange={(e) =>
              setUpdatePost({
                ...updatePost,
                views: Math.max(0, e.target.value),
              })
            }
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
