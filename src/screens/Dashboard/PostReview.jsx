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
  Form,
  Pagination,
  Spinner
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
  FaCheck,
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

// Comment out the dummy posts as we're now using API data
// const dummyPosts = [
//   {
//     id: 1,
//     title: "New Policies Announcement",
//     content: "The government has introduced new policies for economic growth.",
//     author: "Sparta",
//     date: "2025-04-01",
//     flagged: false,
//   },
//   {
//     id: 2,
//     title: "Healthcare Improvements",
//     content: "New hospitals are being built to improve healthcare facilities.",
//     author: "Tom",
//     date: "2025-04-02",
//     flagged: false,
//   },
//   {
//     id: 3,
//     title: "Agricultural Support Scheme",
//     content: "Government launches support scheme for farmers.",
//     author: "Jhon",
//     date: "2025-04-03",
//     flagged: false,
//   },
// ];

const PostReview = ({
  inDashboard = false,
  posts = [],
  setPosts,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalPosts = 0,
  approvedPosts = [],
  setApprovedPosts
}) => {
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPostDetailModal, setShowPostDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [approvingPostId, setApprovingPostId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "flagged", "review", "approved"

  const navigate = useNavigate();

  // Helper function to check if a post is an admin post - update to handle API structure
  const isAdminPost = (post) => {
    // For now, no posts are considered admin posts until we have an admin flag
    return false; // Will be updated when admin flag is available in API
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
    setEditedPost({ ...selectedPost });
    setIsEditMode(true);
  };

  // Function to get user avatar
  const getUserAvatar = (post) => {
    if (post && post.authorImage && post.authorImage !== "https://stage.suniyenetajee.comnull" && post.authorImage !== "https://stage.suniyenetajee.com/") {
      return post.authorImage;
    }

    // Return null to indicate no image is available
    return null;
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    console.log(`Rendering pagination for page ${currentPage} of ${totalPages}`);

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => {
          console.log(`Previous button clicked, current page: ${currentPage}`);
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
      />
    );

    // First page
    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => {
          console.log(`Page 1 clicked, current page: ${currentPage}`);
          onPageChange(1);
        }}
      >
        1
      </Pagination.Item>
    );

    // Ellipsis if needed
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
    }

    // Pages around current page
    for (let page = Math.max(2, currentPage - 1); page <= Math.min(totalPages - 1, currentPage + 1); page++) {
      if (page === 1 || page === totalPages) continue; // Skip first and last pages as they're handled separately
      items.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => {
            console.log(`Page ${page} clicked, current page: ${currentPage}`);
            onPageChange(page);
          }}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
    }

    // Last page (if there's more than one page)
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => {
            console.log(`Last page ${totalPages} clicked, current page: ${currentPage}`);
            onPageChange(totalPages);
          }}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => {
          console.log(`Next button clicked, current page: ${currentPage}`);
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  // Function to handle post approval
  const handleApprovePost = async (postId) => {
    if (approvingPostId) return; // Prevent multiple simultaneous approvals

    setApprovingPostId(postId);

    try {
      // Use hardcoded token
      const token = '7b257e1452f1115b0c70f80a1d54ccd8615aa52c';

      const formData = new FormData();
      formData.append('action', 'approve');

      const response = await fetch(`https://stage.suniyenetajee.com/api/v1/web/post-status-update/${postId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData,
      });

      console.log('Approve API Response Status:', response.status);

      const data = await response.json();
      console.log('Approve API Response Data:', data);

      if (response.ok) {
        // Add the postId to approved posts list
        setApprovedPosts(prev => [...prev, postId]);

        // Show success in the UI
        console.log('Post approved successfully:', data.message);
      } else {
        console.error('Failed to approve post:', data.detail || data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error approving post:', error);
    } finally {
      setApprovingPostId(null);
    }
  };

  // Check if a post is approved
  const isPostApproved = (postId) => {
    return approvedPosts.includes(postId);
  };

  // Determine timer color based on post creation date
  const getTimerColor = (dateString) => {
    if (!dateString) return "#28a745"; // Default green if no date
    
    try {
      const postDate = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(postDate.getTime())) {
        console.error(`Invalid date format: ${dateString}`);
        return "#28a745"; // Default to green for invalid dates
      }
      
      const now = new Date();
      const diffHours = (now - postDate) / (1000 * 60 * 60);
      
      console.log(`Post date: ${dateString}, Diff hours: ${diffHours}`);
      
      if (diffHours > 24) {
        return "#dc3545"; // Red for posts older than 24 hours
      } else if (diffHours > 10) {
        return "#f0ad4e"; // Yellow for posts between 10-24 hours
      } else {
        return "#28a745"; // Green for posts less than 10 hours old
      }
    } catch (error) {
      console.error(`Error processing date: ${dateString}`, error);
      return "#28a745"; // Default to green for any errors
    }
  };

  // Filter posts based on active filter
  const filteredPosts = () => {
    let filtered = [];
    
    switch (activeFilter) {
      case "flagged":
        filtered = posts.filter(post => post.flagged);
        break;
      case "review":
        filtered = posts.filter(post => !isPostApproved(post.id) && !post.flagged);
        break;
      case "approved":
        filtered = posts.filter(post => isPostApproved(post.id));
        break;
      default:
        filtered = posts; // Show all posts by default
    }
    
    // Sort posts by date_created (oldest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date_created);
      const dateB = new Date(b.date_created);
      return dateA - dateB; // Ascending order (oldest first)
    });
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
                        <th style={{ width: "20%" }}>Content</th>
                        <th style={{ width: "10%" }}>Media</th>
                        <th style={{ width: "15%" }}>Author</th>
                        <th style={{ width: "12%" }}>Date</th>
                        <th style={{ width: "8%" }}>Status</th>
                        <th style={{ width: "10%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts().length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">No posts available</td>
                        </tr>
                      ) : (
                        filteredPosts().map((post, index) => (
                        <tr key={post.id}>
                            <td style={{ verticalAlign: "middle" }}>{(currentPage - 1) * 10 + index + 1}</td>
                          <td
                            onClick={() => {
                              setSelectedPost(post);
                              setShowPostDetailModal(true);
                            }}
                            style={{ cursor: "pointer", verticalAlign: "middle" }}
                          >
                              {post.title?.length > 60
                              ? post.title.slice(0, 60) + "..."
                                : post.title || "No content"}
                          </td>
                          <td
                            onClick={() => {
                              setSelectedPost(post);
                              setShowPostDetailModal(true);
                            }}
                            style={{ cursor: "pointer", verticalAlign: "middle" }}
                          >
                              {post.image ? (
                                <img
                                  src={post.image}
                                  alt="Post media"
                                  style={{ height: "50px", width: "80px", objectFit: "cover" }}
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/80x50?text=No+Image";
                                  }}
                                />
                              ) : (
                                <span className="text-muted">No media</span>
                              )}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <div className="d-flex align-items-center">
                              <div
                                className="rounded-circle me-2 overflow-hidden"
                                style={{
                                    width: "32px",
                                    height: "32px",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                    backgroundImage: getUserAvatar(post) ? `url(${getUserAvatar(post)})` : "none",
                                    backgroundColor: getUserAvatar(post) ? "transparent" : "#e9ecef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #dee2e6",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                  }}
                                >
                                  {!getUserAvatar(post) && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c757d" className="bi bi-person" viewBox="0 0 16 16" style={{ display: "block" }}>
                                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                    </svg>
                                  )}
                                </div>
                                {post.author || "Unknown"}
                            </div>
                          </td>
                          <td style={{ verticalAlign: "middle" }}>{post.date}</td>
                            <td style={{ verticalAlign: "middle" }}>
                              <div className="d-flex justify-content-start">
                                {post.flagged ? (
                                  <span className="badge bg-danger">Flagged</span>
                                ) : isPostApproved(post.id) ? (
                                  <span className="badge bg-success">Approved</span>
                                ) : (
                                  <span className="small" style={{ color: getTimerColor(post.date_created) }}>
                                    {(() => {
                                      const postDate = new Date(post.date_created);
                                      const now = new Date();
                                      const diffMs = now - postDate;
                                      const diffHours = diffMs / (1000 * 60 * 60);
                                      const diffMinutes = diffMs / (1000 * 60);
                                      
                                      if (diffHours >= 24) {
                                        const days = Math.floor(diffHours / 24);
                                        return `${days} day${days > 1 ? 's' : ''}`;
                                      } else if (diffHours >= 1) {
                                        const hours = Math.floor(diffHours);
                                        return `${hours} hr${hours > 1 ? 's' : ''}`;
                                      } else {
                                        const minutes = Math.floor(diffMinutes);
                                        return `${minutes} min${minutes > 1 ? 's' : ''}`;
                                      }
                                    })()}
                                  </span>
                                )}
                              </div>
                            </td>
                          <td style={{ verticalAlign: "middle" }}>
                            <div className="post-actions d-flex justify-content-center align-items-center">
                                <Button
                                  variant="light"
                                  size="sm"
                                  className="me-1"
                                  onClick={() => handleApprovePost(post.id)}
                                  disabled={approvingPostId === post.id}
                                >
                                  {approvingPostId === post.id ? (
                                    <Spinner
                                      as="span"
                                      animation="border"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <FaCheck style={{
                                      color: isPostApproved(post.id) ? "#28a745" : "#6c757d"
                                    }} />
                                  )}
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
                        ))
                      )}
                    </tbody>
                  </Table>

                  {/* Pagination - Always show when there are posts */}
                  {posts.length > 0 && (
                    <div className="d-flex flex-column align-items-center mt-4 mb-3 p-3">
                      <div className="text-muted mb-2">
                        Showing page {currentPage} of {totalPages} (Total posts: {totalPosts})
                      </div>
                      <Pagination className="mb-0">
                        {renderPaginationItems()}
                      </Pagination>
                    </div>
                  )}
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
                    }}
                  >
                    <FaSearch style={{ color: "#6c757d" }} />
                  </div>
                </div>

                {/* First Row: Show All & Under Review */}
                <div className="d-flex gap-2 mb-3">
                  {/* Show All Posts Button */}
                  <Button
                    variant={activeFilter === "all" ? "dark" : "light"}
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: activeFilter === "all" ? "#212529" : "white",
                      transition: "all 0.2s ease",
                    }}
                    onMouseDown={(e) => {
                      if (activeFilter !== "all") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseUp={(e) => {
                      if (activeFilter !== "all") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== "all") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseOver={(e) => {
                      if (activeFilter !== "all") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeFilter !== "all") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onClick={() => setActiveFilter("all")}
                  >
                    <FaSearch className="me-2" style={{ color: activeFilter === "all" ? "white" : "#212529" }} /> Show All
                  </Button>

                  {/* Under Review Button */}
                  <Button
                    variant={activeFilter === "review" ? "warning" : "light"}
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: activeFilter === "review" ? "#f0ad4e" : "white",
                      transition: "all 0.2s ease",
                    }}
                    onMouseDown={(e) => {
                      if (activeFilter !== "review") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseUp={(e) => {
                      if (activeFilter !== "review") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== "review") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseOver={(e) => {
                      if (activeFilter !== "review") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeFilter !== "review") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onClick={() => setActiveFilter(activeFilter === "review" ? "all" : "review")}
                  >
                    <FiClock className="me-2" style={{ color: activeFilter === "review" ? "white" : "#f0ad4e" }} /> Under Review
                  </Button>
                </div>

                {/* Second Row: Flagged & Approved */}
                <div className="d-flex gap-2 mb-3">
                  {/* Flagged Only Button */}
                  <Button
                    variant={activeFilter === "flagged" ? "primary" : "light"}
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: activeFilter === "flagged" ? "#0d6efd" : "white",
                      transition: "all 0.2s ease",
                    }}
                    onMouseDown={(e) => {
                      if (activeFilter !== "flagged") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseUp={(e) => {
                      if (activeFilter !== "flagged") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== "flagged") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseOver={(e) => {
                      if (activeFilter !== "flagged") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeFilter !== "flagged") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onClick={() => setActiveFilter(activeFilter === "flagged" ? "all" : "flagged")}
                  >
                    <FaFlag className="me-2" style={{ color: activeFilter === "flagged" ? "white" : "#dc3545" }} /> Flagged Only
                  </Button>

                  {/* Approved Posts Button */}
                  <Button
                    variant={activeFilter === "approved" ? "success" : "light"}
                    className="w-50"
                    style={{
                      borderColor: "#dee2e6",
                      backgroundColor: activeFilter === "approved" ? "#28a745" : "white",
                      transition: "all 0.2s ease",
                    }}
                    onMouseDown={(e) => {
                      if (activeFilter !== "approved") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseUp={(e) => {
                      if (activeFilter !== "approved") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== "approved") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onMouseOver={(e) => {
                      if (activeFilter !== "approved") {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeFilter !== "approved") {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                    onClick={() => setActiveFilter(activeFilter === "approved" ? "all" : "approved")}
                  >
                    <FiClock className="me-2" style={{ color: activeFilter === "approved" ? "white" : "#28a745" }} /> Approved
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
              {selectedPost.image ? (
              <div className="d-flex justify-content-center">
                <div style={{ width: "100%", maxWidth: "18rem" }}>
                  <Card.Img
                    variant="top"
                      src={selectedPost.image}
                    style={{
                      height: "auto",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                    }}
                    className="img-fluid"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                  />
                </div>
              </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "18rem",
                      height: "200px",
                      background: "#f8f9fa",
                      border: "1px dashed #dee2e6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px"
                    }}
                  >
                    <span className="text-muted">No Media</span>
                  </div>
                </div>
              )}
              <Card.Body>
                {isEditMode ? (
                  // Edit Mode - Show form fields
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Content</Form.Label>
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
                      <Form.Label>Description</Form.Label>
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
                      {selectedPost.title || "No Title"}
                </Card.Title>
                <div className="mb-3">
                      <span className="badge bg-primary me-2">User Post</span>
                      {isAdminPost(selectedPost) && (
                        <span className="badge bg-success me-2">Admin Post</span>
                      )}
                </div>
                    <Card.Text className="mb-4">{selectedPost.content || "No content"}</Card.Text>

                    {/* Additional content - commented out
                <h6 className="fw-bold mt-4">Background Information</h6>
                <Card.Text className="mb-4">
                      This post was submitted by a user on our platform.
                </Card.Text>
                    */}
                  </>
                )}

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <small className="text-muted d-block">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle me-2 overflow-hidden" 
                          style={{ 
                            width: "32px",
                            height: "32px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundImage: getUserAvatar(selectedPost) ? `url(${getUserAvatar(selectedPost)})` : "none",
                            backgroundColor: getUserAvatar(selectedPost) ? "transparent" : "#e9ecef",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #dee2e6",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                          }}
                        >
                          {!getUserAvatar(selectedPost) && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c757d" className="bi bi-person" viewBox="0 0 16 16" style={{ display: "block" }}>
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                          )}
                        </div>
                        Posted By {selectedPost.author || "Unknown"}
                      </div>
                    </small>
                    <small className="text-muted d-block">
                      Published on {selectedPost.date}
                      {!isPostApproved(selectedPost.id) && (
                        <span className="ms-2" style={{ color: getTimerColor(selectedPost.date_created) }}>
                          {(() => {
                            const postDate = new Date(selectedPost.date_created);
                            const now = new Date();
                            const diffMs = now - postDate;
                            const diffHours = diffMs / (1000 * 60 * 60);
                            const diffMinutes = diffMs / (1000 * 60);
                            
                            if (diffHours >= 24) {
                              const days = Math.floor(diffHours / 24);
                              return `${days} day${days > 1 ? 's' : ''}`;
                            } else if (diffHours >= 1) {
                              const hours = Math.floor(diffHours);
                              return `${hours} hr${hours > 1 ? 's' : ''}`;
                            } else {
                              const minutes = Math.floor(diffMinutes);
                              return `${minutes} min${minutes > 1 ? 's' : ''}`;
                            }
                          })()}
                        </span>
                      )}
                    </small>
                    {isAdminPost(selectedPost) && (
                      <small className="text-success d-block fw-bold">
                        Admin User
                      </small>
                    )}
                    {isPostApproved(selectedPost.id) ? (
                      <small className="text-success d-block fw-bold">
                        ✓ Approved
                      </small>
                    ) : null}
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
                      <Button
                        variant={isPostApproved(selectedPost.id) ? "success" : "light"}
                        size="sm"
                        className="me-1"
                        onClick={() => handleApprovePost(selectedPost.id)}
                        disabled={approvingPostId === selectedPost.id}
                      >
                        {approvingPostId === selectedPost.id ? (
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ) : (
                          <FaCheck style={{ color: isPostApproved(selectedPost.id) ? "white" : "#6c757d" }} />
                        )}
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
                            setSelectedPost({ ...selectedPost, flagged: false });
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
