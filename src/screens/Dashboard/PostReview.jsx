import React, { useState, useEffect } from "react";
import "../../assets/css/Dashboard.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaFlag,
  FaClipboardCheck,
  FaCity,
  FaPoll,
  FaFileSignature,
  FaComments,
} from "react-icons/fa";
import { FiTrash, FiFlag, FiClock, FiEdit } from "react-icons/fi";

const colors = {
  WHITE: "#fff",
  LIGHT_GRAY: "rgba(236, 236, 236, 0.2)",
  GRAY: "rgba(235, 235, 235, 1)",
  DARK_GRAY: "#717171",
  primary_black: "#2D3548",
  primary_blue: "#1463D8",
  backgroundColor: "#FFF8E1",
  btncolor: "#4165E8",
};

const dummyPosts = [
  {
    id: 1,
    title: "New Policies Announcement",
    content: "The government has introduced new policies for economic growth.",
    author: "Sparta",
    date: "2025-04-01",
    flagged: false,
  },
  {
    id: 2,
    title: "Healthcare Improvements",
    content: "New hospitals are being built to improve healthcare facilities.",
    author: "Tom",
    date: "2025-04-02",
    flagged: false,
  },
  {
    id: 3,
    title: "Agricultural Support Scheme",
    content: "Government launches support scheme for farmers.",
    author: "Jhon",
    date: "2025-04-03",
    flagged: false,
  },
];

const PostReview = ({ inDashboard = false, posts = dummyPosts, setPosts }) => {
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPostDetailModal, setShowPostDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  const navigate = useNavigate();

  // Helper function to check if a post is an admin post
  const isAdminPost = (post) => {
    return post.author === 'Admin' || post.author === 'Sparta';
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleFlag = (post) => {
    setSelectedPost(post);
    setShowFlagModal(true);
  };

  const confirmFlag = () => {
    if (!selectedPost) return; // Prevents errors if no post is selected
    setPosts(posts.filter((post) => post.id !== selectedPost.id));
    setShowFlagModal(false);
    setSelectedPost(null); // Reset selected post
  };

  // Handle edit changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save edited post
  const saveEditedPost = () => {
    // Update the posts array with the edited post
    const updatedPosts = posts.map(post => 
      post.id === editedPost.id ? editedPost : post
    );
    
    setPosts(updatedPosts);
    setSelectedPost(editedPost);
    setIsEditMode(false);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditedPost(selectedPost);
    setIsEditMode(false);
  };

  // Enable edit mode
  const enableEditMode = () => {
    setEditedPost({...selectedPost});
    setIsEditMode(true);
  };

  return (
    <Container
      fluid
      className="p-0"
    >
      {/* {!inDashboard && (
        <Row className="mb-4">
          <Col>
            <Link to="/dashboard" className="text-decoration-none">
              <Button
                variant="light"
                className="d-flex align-items-center shadow-sm"
              >
                <FaArrowLeft className="me-2" /> Back to Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
      )} */}
      <Row className="g-4">
        {/* Posts Under Review Card - Left Side */}
        <Col lg={inDashboard ? 12 : 8}>
          <Row className="g-3">
            <Col xs={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                  <Table bordered hover responsive className="mb-0 table-aligned-with-header">
                    <thead>
                      <tr>
                        <th style={{ width: "5%" }}>S.No.</th>
                        <th style={{ width: "20%" }}>Title</th>
                        <th style={{ width: "28%" }}>Content</th>
                        <th style={{ width: "15%" }}>Author</th>
                        <th style={{ width: "12%" }}>Date</th>
                        <th style={{ width: "5%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td style={{ verticalAlign: "middle" }}>{post.id}</td>
                          <td
                            onClick={() => {
                              setSelectedPost(post);
                              setShowPostDetailModal(true);
                            }}
                            style={{ cursor: "pointer", verticalAlign: "middle" }}
                          >
                            {post.title.length > 60
                              ? post.title.slice(0, 60) + "..."
                              : post.title}
                          </td>
                          <td
                            onClick={() => {
                              setSelectedPost(post);
                              setShowPostDetailModal(true);
                            }}
                            style={{ cursor: "pointer", verticalAlign: "middle" }}
                          >
                            {post.content.length > 60
                              ? post.content.slice(0, 60) + "..."
                              : post.content}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <div className="d-flex align-items-center">
                              <div
                                className="rounded-circle me-2 overflow-hidden"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  backgroundImage: `url(${
                                    post.author === "Sparta"
                                      ? "https://randomuser.me/api/portraits/men/32.jpg"
                                      : post.author === "Tom"
                                        ? "https://randomuser.me/api/portraits/men/41.jpg"
                                        : post.author === "Jhon"
                                          ? "https://randomuser.me/api/portraits/men/55.jpg"
                                          : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90) + 10}.jpg`
                                  })`
                                }}
                              />
                              {post.author}
                            </div>
                          </td>
                          <td style={{ verticalAlign: "middle" }}>{post.date}</td>
                          <td style={{ verticalAlign: "middle" }}>
                            <div className="post-actions d-flex justify-content-center align-items-center">
                              <Button variant="light" size="sm" className="me-1">
                                <FiClock style={{ color: "#f0ad4e" }} />
                              </Button>
                              <Button
                                variant={post.flagged ? "success" : "light"}
                                size="sm"
                                className="me-1"
                                onClick={() => {
                                  if (post.flagged) {
                                    // If already flagged, unflag directly without showing modal
                                    const updatedPosts = posts.map((p) =>
                                      p.id === post.id
                                        ? { ...p, flagged: false }
                                        : p
                                    );
                                    setPosts(updatedPosts);
                                  } else {
                                    // If not flagged, show the flag modal
                                    setSelectedPost(post);
                                    setShowFlagModal(true);
                                  }
                                }}
                              >
                                <FiFlag
                                  style={{
                                    color: post.flagged ? "white" : "black",
                                  }}
                                />
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  setSelectedPost(post);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <FiTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Filter & Moderation Card - Right Side */}
        {!inDashboard && (
          <Col lg={4}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Filter & Moderation</h4>

                {/* Search Input with Icon */}
                <div className="position-relative mb-3">
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    className="form-control ps-5"
                    style={{
                      color: "#212529",
                      fontSize: "13px",
                      fontWeight: "bold",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "8px 12px",
                      width: "100%",
                      height: "38px",
                      // border:"2px solid green"
                    }}
                  />
                  <div
                    className="position-absolute"
                    style={{
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      // border:"2px solid green",
                      // paddingRight:"10px",
                    }}
                  >
                    <FaSearch style={{ color: "#6c757d" }} />
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="d-flex gap-2 mb-3">
                  <Button
                    variant="light"
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: "white",
                      transition: "all 0.2s ease",
                    }}
                    onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseUp={(e) => e.currentTarget.style.backgroundColor = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                  >
                    <FaFlag className="me-2" /> Flagged Only
                  </Button>
                  <Button
                    variant="light"
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: "white",
                      transition: "all 0.2s ease",
                    }}
                    onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseUp={(e) => e.currentTarget.style.backgroundColor = "white"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                  >
                    <FaClipboardCheck className="me-2" /> Under Review
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Quick Admin Actions Card */}
            <Card className="shadow-sm border-0 mt-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Quick Admin Actions</h4>
                {/* First row of buttons */}
                <div className="d-flex gap-2 mb-3">
                  <Button
                    id="civic-button"
                    variant="light"
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: "white",
                    }}
                    onClick={(e) => {
                      const btn = document.getElementById("civic-button");
                      btn.style.backgroundColor = "#f5f5f5";
                      setTimeout(() => {
                        btn.style.backgroundColor = "white";
                      }, 150);
                      console.log("Civic Issues clicked");
                    }}
                  >
                    <FaCity className="me-2" style={{ color: "#4B89DC" }} /> Civic
                    Issues
                  </Button>
                  <Button
                    id="poll-button"
                    variant="light"
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: "white",
                    }}
                    onClick={(e) => {
                      const btn = document.getElementById("poll-button");
                      btn.style.backgroundColor = "#f5f5f5";
                      setTimeout(() => {
                        btn.style.backgroundColor = "white";
                      }, 150);
                      console.log("Poll Requests clicked");
                    }}
                  >
                    <FaPoll className="me-2" style={{ color: "#8E44AD" }} /> Poll
                    Requests
                  </Button>
                </div>

                {/* Second row of buttons */}
                <div className="d-flex gap-2">
                  <Button
                    id="petitions-button"
                    variant="light"
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: "white",
                    }}
                    onClick={(e) => {
                      const btn = document.getElementById("petitions-button");
                      btn.style.backgroundColor = "#f5f5f5";
                      setTimeout(() => {
                        btn.style.backgroundColor = "white";
                      }, 150);
                      console.log("Petitions clicked");
                    }}
                  >
                    <FaFileSignature
                      className="me-2"
                      style={{ color: "#16A085" }}
                    />
                    Petitions
                  </Button>
                  <Button
                    id="campaign-button"
                    variant="light"
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: "white",
                    }}
                    onClick={(e) => {
                      const btn = document.getElementById("campaign-button");
                      btn.style.backgroundColor = "#f5f5f5";
                      setTimeout(() => {
                        btn.style.backgroundColor = "white";
                      }, 150);
                      console.log("Campaign Feedback clicked");
                    }}
                  >
                    <FaComments className="me-2" style={{ color: "#E67E22" }} />
                    Campaign Feedback
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Flag Warning Modal */}
      <Modal
        show={showFlagModal}
        onHide={() => setShowFlagModal(false)}
        centered
        className="custom-modal"
      >
        <Modal.Header style={{ position: 'relative', borderBottom: '1px solid #dee2e6', padding: '1rem' }}>
          <Modal.Title>⚠️ Warning: Inappropriate Content</Modal.Title>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowFlagModal(false)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              width: '24px',
              height: '24px',
              backgroundColor: '#000000',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              opacity: 1.0
            }}
          >
            <span style={{ color: 'white', fontSize: '1.2rem', marginTop: '-2px', marginLeft: '-1px' }}>×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <p>
            The post you are flagging contains content that violates our
            community guidelines.
          </p>
          <p>
            If the user continues to post inappropriate content, their account
            may be suspended or permanently banned.
          </p>
          <p>Please select a reason for flagging this content:</p>
          <select className="form-select mb-3">
            <option>Hate speech or discrimination</option>
            <option>Violence or threatening content</option>
            <option>Harassment or bullying</option>
            <option>Misinformation</option>
            <option>Other (please specify)</option>
          </select>
          <p>Do you want to proceed with flagging this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowFlagModal(false)}
            style={{ backgroundColor: '#000', borderColor: '#000' }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // Handle flag confirmation logic here
              const updatedPosts = posts.map((p) =>
                p.id === selectedPost.id ? { ...p, flagged: true } : p
              );
              setPosts(updatedPosts);
              setShowFlagModal(false);
            }}
          >
            Confirm Flag
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="custom-modal"
      >
        <Modal.Header style={{ position: 'relative', borderBottom: '1px solid #dee2e6', padding: '1rem' }}>
          <Modal.Title>⚠️ Confirm Deletion</Modal.Title>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowDeleteModal(false)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              width: '24px',
              height: '24px',
              backgroundColor: '#000000',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              opacity: 1.0
            }}
          >
            <span style={{ color: 'white', fontSize: '1.2rem', marginTop: '-2px', marginLeft: '-1px' }}>×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
          {selectedPost && (
            <div className="p-3 bg-light rounded mb-3">
              <h6 className="fw-bold">{selectedPost.title}</h6>
              <p className="text-muted mb-0 small">{selectedPost.content}</p>
            </div>
          )}
          <p className="text-danger">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            style={{ backgroundColor: '#000', borderColor: '#000' }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // Handle delete confirmation logic here
              setPosts(posts.filter((post) => post.id !== selectedPost?.id));
              setShowDeleteModal(false);
            }}
          >
            Delete Permanently
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Post Detail Modal */}
      <Modal
        show={showPostDetailModal}
        onHide={() => {
          setShowPostDetailModal(false);
          setIsEditMode(false);
        }}
        centered
        size="lg"
        className="custom-modal"
      >
        <Modal.Header style={{ position: 'relative', borderBottom: '1px solid #dee2e6', padding: '1rem' }}>
          <Modal.Title>{isEditMode ? "Edit Post" : "Post Details"}</Modal.Title>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => {
              setShowPostDetailModal(false);
              setIsEditMode(false);
            }}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              width: '24px',
              height: '24px',
              backgroundColor: '#000000',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              opacity: 1.0
            }}
          >
            <span style={{ color: 'white', fontSize: '1.2rem', marginTop: '-2px', marginLeft: '-1px' }}>×</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {selectedPost && (
            <Card className="border-0 shadow-sm">
              <div className="d-flex justify-content-center">
                <div style={{ width: "100%", maxWidth: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      selectedPost.image ? selectedPost.image : 
                      selectedPost.title.toLowerCase().includes("healthcare")
                        ? "https://firsteditionfirstaid.ca/wp-content/uploads/2022/08/An-apple-a-day_-Will-it-really-keep-the-doctor-away-IMAGE.png"
                        : selectedPost.title
                            .toLowerCase()
                            .includes("agricultural")
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7ahvb8aEN76vOIivqeFpa9_gBV5rZm2erw&s"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0sCSNq1Leueb3UMTJ1dNwwNqk7gRmeCkUn6C7JoVlgd7pewsg4I8ckmUFedWxsEe6Cxs&usqp=CAU"
                    }
                    style={{
                      height: "auto",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                    }}
                    className="img-fluid"
                  />
                </div>
              </div>
              <Card.Body>
                {isEditMode ? (
                  // Edit Mode - Show form fields
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="title" 
                        value={editedPost.title}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select 
                        name="category" 
                        value={editedPost.category || ''}
                        onChange={handleEditChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Politics">Politics</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Education">Education</option>
                        <option value="Technology">Technology</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Content</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={5} 
                        name="content" 
                        value={editedPost.content}
                        onChange={handleEditChange}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  // View Mode - Show content
                  <>
                    <Card.Title className="fw-bold mb-3">
                      {selectedPost.title}
                    </Card.Title>
                    <div className="mb-3">
                      {selectedPost.category ? (
                        <span className={`badge bg-${
                          selectedPost.category === "Politics" ? "secondary" : 
                          selectedPost.category === "Healthcare" ? "info" : 
                          selectedPost.category === "Agriculture" ? "success" : 
                          selectedPost.category === "Education" ? "warning" : 
                          selectedPost.category === "Technology" ? "primary" : 
                          "secondary"
                        } me-2`}>{selectedPost.category}</span>
                      ) : (
                        <>
                          {selectedPost.title.toLowerCase().includes("policies") && (
                            <span className="badge bg-secondary me-2">Politics</span>
                          )}
                          {selectedPost.title.toLowerCase().includes("healthcare") && (
                            <span className="badge bg-info me-2">Healthcare</span>
                          )}
                          {selectedPost.title
                            .toLowerCase()
                            .includes("agricultural") && (
                            <span className="badge bg-success me-2">Agriculture</span>
                          )}
                        </>
                      )}
                      <span className="badge bg-primary">Featured</span>
                    </div>
                    <Card.Text className="mb-4">{selectedPost.content}</Card.Text>

                    {/* Additional content */}
                    <h6 className="fw-bold mt-4">Background Information</h6>
                    <Card.Text className="mb-4">
                      This policy announcement comes after months of deliberation
                      and public consultation. The government has been working on
                      these reforms since early 2025, with input from various
                      stakeholders including industry leaders, civil society
                      organizations, and academic experts.
                    </Card.Text>

                    <h6 className="fw-bold mt-4">Impact Analysis</h6>
                    <Card.Text className="mb-4">
                      Economic experts predict these policies will boost GDP growth
                      by 2-3% over the next fiscal year. Small businesses are
                      expected to benefit significantly from tax incentives and
                      reduced regulatory burdens. However, some sectors may face
                      adjustment challenges in the short term.
                    </Card.Text>

                    <h6 className="fw-bold mt-4">Public Reaction</h6>
                    <Card.Text className="mb-4">
                      Initial public response has been mixed. A recent poll shows
                      58% support for the new policies, with stronger approval among
                      urban residents and younger demographics. Opposition parties
                      have criticized aspects of the implementation timeline.
                    </Card.Text>
                  </>
                )}

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <small className="text-muted d-block">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle me-2 overflow-hidden" 
                          style={{ 
                            width: "24px", 
                            height: "24px", 
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundImage: `url(${
                              selectedPost.author === "Sparta" 
                                ? "https://randomuser.me/api/portraits/men/32.jpg" 
                                : selectedPost.author === "Tom" 
                                ? "https://randomuser.me/api/portraits/men/41.jpg" 
                                : selectedPost.author === "Jhon"
                                ? "https://randomuser.me/api/portraits/men/55.jpg"
                                : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90) + 10}.jpg`
                            })`
                          }}
                        />
                        Posted By {selectedPost.author}
                      </div>
                    </small>
                    <small className="text-muted d-block">
                      Published on {selectedPost.date}
                    </small>
                    <small className="text-muted d-block">
                      Last updated: April 5, 2025
                    </small>
                    {isAdminPost(selectedPost) && (
                      <small className="text-success d-block fw-bold">
                        Admin Post
                      </small>
                    )}
                  </div>
                  {!isEditMode && (
                    <div>
                      {isAdminPost(selectedPost) && (
                        <Button 
                          variant="light" 
                          size="sm" 
                          className="me-1"
                          onClick={enableEditMode}
                          title="Edit Post"
                        >
                          <FiEdit style={{ color: "#000" }} />
                        </Button>
                      )}
                      <Button variant="light" size="sm" className="me-1">
                        <FiClock style={{ color: "#f0ad4e" }} />
                      </Button>
                      <Button
                        variant={selectedPost.flagged ? "success" : "light"}
                        size="sm"
                        className="me-1"
                        onClick={() => {
                          if (selectedPost.flagged) {
                            // If already flagged, unflag directly without showing modal
                            const updatedPosts = posts.map((p) =>
                              p.id === selectedPost.id
                                ? { ...p, flagged: false }
                                : p
                            );
                            setPosts(updatedPosts);
                            // This ensures the selectedPost state also gets updated
                            setSelectedPost({...selectedPost, flagged: false});
                          } else {
                            // If not flagged, show the flag modal
                            setShowPostDetailModal(false);
                            setShowFlagModal(true);
                          }
                        }}
                      >
                        <FiFlag
                          style={{
                            color: selectedPost.flagged ? "white" : "black",
                          }}
                        />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setShowPostDetailModal(false);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FiTrash />
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditMode ? (
            <>
              <Button
                variant="secondary"
                onClick={cancelEditing}
                style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={saveEditedPost}
                style={{ backgroundColor: '#000', borderColor: '#000' }}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setShowPostDetailModal(false)}
              style={{ backgroundColor: '#000', borderColor: '#000' }}
            >
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PostReview;
