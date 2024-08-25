import React, { memo } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import { useGetProfileQuery } from "../../context/api/adminApi";
import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

const sidebarWidth = 250; // Set the width of the sidebar

const SidebarContainer = styled(Box)({
  width: sidebarWidth,
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  borderRight: '1px solid #e0e0e0',
  borderRadius: '4px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1000, // Ensures the sidebar stays on top
});

const MainContent = styled(Box)({
  marginLeft: sidebarWidth, // Push the content to the right of the sidebar
  padding: '16px',
  // backgroundColor: '#f5f5f5',
  minHeight: '100vh', // Ensure the content takes up full height
});

const SidebarHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e0e0e0',
});

const SidebarLink = styled(Link)(({ active }) => ({
  textDecoration: 'none',
  color: active ? '#000' : '#757575',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '4px',
  border: '1px solid transparent',
  marginBottom: '8px',
  transition: 'border-color 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    color: '#000',
    borderColor: '#000',
  },
  ...(active && {
    backgroundColor: '#f5f5f5',
    borderColor: '#000',
  }),
}));

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: profileData } = useGetProfileQuery();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <SidebarContainer>
        <SidebarHeader>
          <Link to="/">
            <Avatar sx={{ bgcolor: "#000", color: "#fff", marginRight: "8px" }}>
              {profileData?.payload?.fname?.slice(0, 1)?.toUpperCase()}
            </Avatar>
          </Link>
          <span style={{ color: "#000" }}>{profileData?.payload?.fname}</span>
        </SidebarHeader>

        <List>
          <ListItem disablePadding>
            <SidebarLink active={isActive("/admin/productCreate")} to="/admin/productCreate">
              <ListItemIcon>
                <IoCreateOutline />
              </ListItemIcon>
              <ListItemText primary="Create Product" />
            </SidebarLink>
          </ListItem>
          <ListItem disablePadding>
            <SidebarLink active={isActive("/admin/productManage")} to="/admin/productManage">
              <ListItemIcon>
                <AiOutlineProduct />
              </ListItemIcon>
              <ListItemText primary="Manage Product" />
            </SidebarLink>
          </ListItem>
          <ListItem disablePadding>
            <SidebarLink active={isActive("/admin/categoryCreate")} to="/admin/categoryCreate">
              <ListItemIcon>
                <IoCreateOutline />
              </ListItemIcon>
              <ListItemText primary="Create Category" />
            </SidebarLink>
          </ListItem>
          <ListItem disablePadding>
            <SidebarLink active={isActive("/admin/categoryManage")} to="/admin/categoryManage">
              <ListItemIcon>
                <AiOutlineProduct />
              </ListItemIcon>
              <ListItemText primary="Manage Category" />
            </SidebarLink>
          </ListItem>
          <ListItem disablePadding>
            <SidebarLink active={isActive("/")} to="/">
              <ListItemIcon>
                <FaArrowAltCircleLeft />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </SidebarLink>
          </ListItem>
          <ListItem disablePadding>
            <SidebarLink onClick={handleLogOut}>
              <ListItemIcon>
                <RiLogoutBoxLine />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </SidebarLink>
          </ListItem>
        </List>
      </SidebarContainer>

      <MainContent>
        {/* Your main content goes here */}
      </MainContent>
    </>
  );
};

export default memo(Sidebar);
