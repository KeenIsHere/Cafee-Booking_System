"use client"

import { useState } from "react"
import CustomButton from "./custom-button"
import "./admin-dashboard.css"

// Initial data for admin management
const initialTables = [
  {
    id: 1,
    name: "Window Table for 2",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=300&fit=crop",
    location: "By the window",
    amenities: ["Natural light", "Street view"],
    pricePerHour: 15,
    status: "active",
  },
  {
    id: 2,
    name: "Cozy Corner Booth",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=300&fit=crop",
    location: "Corner section",
    amenities: ["Private seating", "Comfortable cushions"],
    pricePerHour: 25,
    status: "active",
  },
]

const initialMenuItems = [
  {
    id: 1,
    name: "Signature Espresso Blend",
    category: "Coffee",
    price: 4.5,
    description: "Our house blend with rich chocolate notes and smooth finish",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop",
    popular: true,
    rating: 4.9,
    status: "active",
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    category: "Coffee",
    price: 5.25,
    description: "Vanilla syrup, steamed milk, espresso, and caramel drizzle",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    popular: true,
    rating: 4.8,
    status: "active",
  },
]

const initialRooms = [
  {
    id: 1,
    name: "Executive Meeting Room",
    category: "Meeting Rooms",
    capacity: 8,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    description: "Professional meeting space with modern amenities",
    amenities: ["Projector", "Whiteboard", "WiFi", "Conference Phone", "Air Conditioning"],
    pricePerHour: 45,
    size: "25 sqm",
    features: ["Natural light", "City view", "Sound-proof"],
    status: "active",
  },
]

const initialBookings = [
  {
    id: 1,
    type: "table",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    itemName: "Window Table for 2",
    date: "2024-01-15",
    timeSlot: "2:00 PM",
    duration: 2,
    totalPrice: 30,
    status: "confirmed",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    type: "room",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    itemName: "Executive Meeting Room",
    date: "2024-01-16",
    timeSlot: "10:00 AM",
    duration: 3,
    totalPrice: 135,
    status: "confirmed",
    createdAt: "2024-01-11",
  },
]

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [tables, setTables] = useState(initialTables)
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [rooms, setRooms] = useState(initialRooms)
  const [bookings, setBookings] = useState(initialBookings)
  const [editingItem, setEditingItem] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Form states
  const [tableForm, setTableForm] = useState({
    name: "",
    capacity: "",
    location: "",
    amenities: "",
    pricePerHour: "",
    image: "",
    status: "active",
  })

  const [menuForm, setMenuForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    popular: false,
    rating: "",
    status: "active",
  })

  const [roomForm, setRoomForm] = useState({
    name: "",
    category: "",
    capacity: "",
    description: "",
    amenities: "",
    pricePerHour: "",
    size: "",
    features: "",
    image: "",
    status: "active",
  })

  const [adminProfile, setAdminProfile] = useState({
    id: 1,
    name: "John Admin",
    email: "admin@cafebook.com",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    phone: "+1 (555) 123-4567",
    department: "Management",
    joinDate: "2023-01-15",
    lastLogin: new Date().toISOString(),
    permissions: ["all"],
    bio: "Experienced cafe manager with 5+ years in hospitality industry.",
  })

  const [settings, setSettings] = useState({
    general: {
      cafeName: "CafeBook",
      timezone: "America/New_York",
      currency: "USD",
      language: "English",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      bookingAlerts: true,
      lowStockAlerts: true,
      dailyReports: true,
    },
    business: {
      openingTime: "08:00",
      closingTime: "22:00",
      maxBookingDuration: 4,
      advanceBookingDays: 30,
      cancellationPolicy: "24 hours",
      taxRate: 8.5,
    },
    security: {
      sessionTimeout: 30,
      passwordExpiry: 90,
      twoFactorAuth: false,
      loginAttempts: 5,
      ipWhitelist: [],
    },
  })

  const [profileForm, setProfileForm] = useState({ ...adminProfile })
  const [settingsForm, setSettingsForm] = useState({ ...settings })
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // CRUD Operations for Tables
  const addTable = () => {
    const newTable = {
      id: Date.now(),
      name: tableForm.name,
      capacity: Number.parseInt(tableForm.capacity),
      location: tableForm.location,
      amenities: tableForm.amenities.split(",").map((a) => a.trim()),
      pricePerHour: Number.parseFloat(tableForm.pricePerHour),
      image: tableForm.image,
      status: tableForm.status,
    }
    setTables([...tables, newTable])
    resetTableForm()
    setShowAddForm(false)
  }

  const updateTable = () => {
    setTables(
      tables.map((table) =>
        table.id === editingItem.id
          ? {
              ...table,
              name: tableForm.name,
              capacity: Number.parseInt(tableForm.capacity),
              location: tableForm.location,
              amenities: tableForm.amenities.split(",").map((a) => a.trim()),
              pricePerHour: Number.parseFloat(tableForm.pricePerHour),
              image: tableForm.image,
              status: tableForm.status,
            }
          : table,
      ),
    )
    resetTableForm()
    setEditingItem(null)
  }

  const deleteTable = (id) => {
    setTables(tables.filter((table) => table.id !== id))
  }

  const resetTableForm = () => {
    setTableForm({
      name: "",
      capacity: "",
      location: "",
      amenities: "",
      pricePerHour: "",
      image: "",
      status: "active",
    })
  }

  // CRUD Operations for Menu Items
  const addMenuItem = () => {
    const newItem = {
      id: Date.now(),
      name: menuForm.name,
      category: menuForm.category,
      price: Number.parseFloat(menuForm.price),
      description: menuForm.description,
      image: menuForm.image,
      popular: menuForm.popular,
      rating: Number.parseFloat(menuForm.rating),
      status: menuForm.status,
    }
    setMenuItems([...menuItems, newItem])
    resetMenuForm()
    setShowAddForm(false)
  }

  const updateMenuItem = () => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: menuForm.name,
              category: menuForm.category,
              price: Number.parseFloat(menuForm.price),
              description: menuForm.description,
              image: menuForm.image,
              popular: menuForm.popular,
              rating: Number.parseFloat(menuForm.rating),
              status: menuForm.status,
            }
          : item,
      ),
    )
    resetMenuForm()
    setEditingItem(null)
  }

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const resetMenuForm = () => {
    setMenuForm({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      popular: false,
      rating: "",
      status: "active",
    })
  }

  // CRUD Operations for Rooms
  const addRoom = () => {
    const newRoom = {
      id: Date.now(),
      name: roomForm.name,
      category: roomForm.category,
      capacity: Number.parseInt(roomForm.capacity),
      description: roomForm.description,
      amenities: roomForm.amenities.split(",").map((a) => a.trim()),
      pricePerHour: Number.parseFloat(roomForm.pricePerHour),
      size: roomForm.size,
      features: roomForm.features.split(",").map((f) => f.trim()),
      image: roomForm.image,
      status: roomForm.status,
    }
    setRooms([...rooms, newRoom])
    resetRoomForm()
    setShowAddForm(false)
  }

  const updateRoom = () => {
    setRooms(
      rooms.map((room) =>
        room.id === editingItem.id
          ? {
              ...room,
              name: roomForm.name,
              category: roomForm.category,
              capacity: Number.parseInt(roomForm.capacity),
              description: roomForm.description,
              amenities: roomForm.amenities.split(",").map((a) => a.trim()),
              pricePerHour: Number.parseFloat(roomForm.pricePerHour),
              size: roomForm.size,
              features: roomForm.features.split(",").map((f) => f.trim()),
              image: roomForm.image,
              status: roomForm.status,
            }
          : room,
      ),
    )
    resetRoomForm()
    setEditingItem(null)
  }

  const deleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  const resetRoomForm = () => {
    setRoomForm({
      name: "",
      category: "",
      capacity: "",
      description: "",
      amenities: "",
      pricePerHour: "",
      size: "",
      features: "",
      image: "",
      status: "active",
    })
  }

  // Profile management functions
  const updateProfile = () => {
    setAdminProfile({ ...profileForm })
    alert("Profile updated successfully!")
  }

  const updateSettings = () => {
    setSettings({ ...settingsForm })
    alert("Settings updated successfully!")
  }

  const changePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    if (passwordForm.currentPassword !== "admin123") {
      alert("Current password is incorrect!")
      return
    }
    alert("Password changed successfully!")
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShowPasswordChange(false)
  }

  const resetPasswordForm = () => {
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShowPasswordChange(false)
  }

  // Edit handlers
  const editTable = (table) => {
    setEditingItem(table)
    setTableForm({
      name: table.name,
      capacity: table.capacity.toString(),
      location: table.location,
      amenities: table.amenities.join(", "),
      pricePerHour: table.pricePerHour.toString(),
      image: table.image,
      status: table.status,
    })
    setActiveTab("tables")
  }

  const editMenuItem = (item) => {
    setEditingItem(item)
    setMenuForm({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      image: item.image,
      popular: item.popular,
      rating: item.rating.toString(),
      status: item.status,
    })
    setActiveTab("menu")
  }

  const editRoom = (room) => {
    setEditingItem(room)
    setRoomForm({
      name: room.name,
      category: room.category,
      capacity: room.capacity.toString(),
      description: room.description,
      amenities: room.amenities.join(", "),
      pricePerHour: room.pricePerHour.toString(),
      size: room.size,
      features: room.features.join(", "),
      image: room.image,
      status: room.status,
    })
    setActiveTab("rooms")
  }

  // Booking management
  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: newStatus } : booking)))
  }

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id))
  }

  // Statistics
  const stats = {
    totalTables: tables.length,
    activeTables: tables.filter((t) => t.status === "active").length,
    totalMenuItems: menuItems.length,
    activeMenuItems: menuItems.filter((m) => m.status === "active").length,
    totalRooms: rooms.length,
    activeRooms: rooms.filter((r) => r.status === "active").length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
    totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
  }

  const renderProfile = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Admin Profile</h2>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <img src={adminProfile.avatar || "/placeholder.svg"} alt={adminProfile.name} />
            <button className="avatar-upload-btn">Change Photo</button>
          </div>
          <div className="profile-info">
            <h3>{adminProfile.name}</h3>
            <p className="profile-role">{adminProfile.role}</p>
            <p className="profile-email">{adminProfile.email}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Member Since</span>
                <span className="stat-value">{new Date(adminProfile.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Login</span>
                <span className="stat-value">{new Date(adminProfile.lastLogin).toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Department</span>
                <span className="stat-value">{adminProfile.department}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-tabs">
            <button className="tab-btn active">Personal Information</button>
            <button className="tab-btn" onClick={() => setShowPasswordChange(!showPasswordChange)}>
              Security
            </button>
          </div>

          <div className="profile-form">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  value={profileForm.department}
                  onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                >
                  <option value="Management">Management</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Bio</label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <div className="form-actions">
              <CustomButton name="Update Profile" onPress={updateProfile} />
              <button className="cancel-btn" onClick={() => setProfileForm({ ...adminProfile })}>
                Cancel
              </button>
            </div>
          </div>

          {showPasswordChange && (
            <div className="password-change-form">
              <h3>Change Password</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-actions">
                <CustomButton name="Change Password" onPress={changePassword} />
                <button className="cancel-btn" onClick={resetPasswordForm}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>System Settings</h2>
      </div>

      <div className="settings-container">
        <div className="settings-nav">
          <button className="settings-nav-btn active">General</button>
          <button className="settings-nav-btn">Notifications</button>
          <button className="settings-nav-btn">Business</button>
          <button className="settings-nav-btn">Security</button>
        </div>

        <div className="settings-content">
          {/* General Settings */}
          <div className="settings-section">
            <h3>General Settings</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Cafe Name</label>
                <input
                  type="text"
                  value={settingsForm.general.cafeName}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      general: { ...settingsForm.general, cafeName: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Timezone</label>
                <select
                  value={settingsForm.general.timezone}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      general: { ...settingsForm.general, timezone: e.target.value },
                    })
                  }
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
              <div className="form-group">
                <label>Currency</label>
                <select
                  value={settingsForm.general.currency}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      general: { ...settingsForm.general, currency: e.target.value },
                    })
                  }
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select
                  value={settingsForm.general.language}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      general: { ...settingsForm.general, language: e.target.value },
                    })
                  }
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <div className="settings-toggles">
              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.emailNotifications}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, emailNotifications: e.target.checked },
                      })
                    }
                  />
                  <span className="toggle-slider"></span>
                  Email Notifications
                </label>
              </div>
              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.smsNotifications}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, smsNotifications: e.target.checked },
                      })
                    }
                  />
                  <span className="toggle-slider"></span>
                  SMS Notifications
                </label>
              </div>
              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.pushNotifications}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, pushNotifications: e.target.checked },
                      })
                    }
                  />
                  <span className="toggle-slider"></span>
                  Push Notifications
                </label>
              </div>
              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.bookingAlerts}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, bookingAlerts: e.target.checked },
                      })
                    }
                  />
                  <span className="toggle-slider"></span>
                  Booking Alerts
                </label>
              </div>
              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settingsForm.notifications.dailyReports}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        notifications: { ...settingsForm.notifications, dailyReports: e.target.checked },
                      })
                    }
                  />
                  <span className="toggle-slider"></span>
                  Daily Reports
                </label>
              </div>
            </div>
          </div>

          {/* Business Settings */}
          <div className="settings-section">
            <h3>Business Settings</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Opening Time</label>
                <input
                  type="time"
                  value={settingsForm.business.openingTime}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      business: { ...settingsForm.business, openingTime: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Closing Time</label>
                <input
                  type="time"
                  value={settingsForm.business.closingTime}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      business: { ...settingsForm.business, closingTime: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Max Booking Duration (hours)</label>
                <input
                  type="number"
                  value={settingsForm.business.maxBookingDuration}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      business: { ...settingsForm.business, maxBookingDuration: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settingsForm.business.taxRate}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      business: { ...settingsForm.business, taxRate: Number.parseFloat(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="settings-section">
            <h3>Security Settings</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settingsForm.security.sessionTimeout}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      security: { ...settingsForm.security, sessionTimeout: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Password Expiry (days)</label>
                <input
                  type="number"
                  value={settingsForm.security.passwordExpiry}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      security: { ...settingsForm.security, passwordExpiry: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Max Login Attempts</label>
                <input
                  type="number"
                  value={settingsForm.security.loginAttempts}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      security: { ...settingsForm.security, loginAttempts: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
            <div className="settings-toggles">
              <div className="toggle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settingsForm.security.twoFactorAuth}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        security: { ...settingsForm.security, twoFactorAuth: e.target.checked },
                      })
                    }
                  />
                  <span className="toggle-slider"></span>
                  Two-Factor Authentication
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <CustomButton name="Save Settings" onPress={updateSettings} />
            <button className="cancel-btn" onClick={() => setSettingsForm({ ...settings })}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderOverview = () => (
    <div className="admin-overview">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🪑</div>
          <div className="stat-info">
            <h3>{stats.totalTables}</h3>
            <p>Total Tables</p>
            <span className="stat-detail">{stats.activeTables} active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-info">
            <h3>{stats.totalMenuItems}</h3>
            <p>Menu Items</p>
            <span className="stat-detail">{stats.activeMenuItems} active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-info">
            <h3>{stats.totalRooms}</h3>
            <p>Total Rooms</p>
            <span className="stat-detail">{stats.activeRooms} active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
            <span className="stat-detail">{stats.confirmedBookings} confirmed</span>
          </div>
        </div>
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${stats.totalRevenue}</h3>
            <p>Total Revenue</p>
            <span className="stat-detail">All time</span>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Bookings</h3>
        <div className="activity-list">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="activity-item">
              <div className="activity-info">
                <h4>{booking.customerName}</h4>
                <p>
                  {booking.itemName} - {booking.date} at {booking.timeSlot}
                </p>
                <span className="activity-price">${booking.totalPrice}</span>
              </div>
              <div className={`activity-status ${booking.status}`}>{booking.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTables = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Tables Management</h2>
        <CustomButton
          name="Add New Table"
          onPress={() => {
            setShowAddForm(true)
            setEditingItem(null)
            resetTableForm()
          }}
        />
      </div>

      {(showAddForm || editingItem) && (
        <div className="form-container">
          <h3>{editingItem ? "Edit Table" : "Add New Table"}</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Table Name"
              value={tableForm.name}
              onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Capacity"
              value={tableForm.capacity}
              onChange={(e) => setTableForm({ ...tableForm, capacity: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={tableForm.location}
              onChange={(e) => setTableForm({ ...tableForm, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Amenities (comma separated)"
              value={tableForm.amenities}
              onChange={(e) => setTableForm({ ...tableForm, amenities: e.target.value })}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price per Hour"
              value={tableForm.pricePerHour}
              onChange={(e) => setTableForm({ ...tableForm, pricePerHour: e.target.value })}
            />
            <input
              type="url"
              placeholder="Image URL"
              value={tableForm.image}
              onChange={(e) => setTableForm({ ...tableForm, image: e.target.value })}
            />
            <select value={tableForm.status} onChange={(e) => setTableForm({ ...tableForm, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="form-actions">
            <CustomButton
              name={editingItem ? "Update Table" : "Add Table"}
              onPress={editingItem ? updateTable : addTable}
            />
            <button
              className="cancel-btn"
              onClick={() => {
                setShowAddForm(false)
                setEditingItem(null)
                resetTableForm()
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="items-grid">
        {tables.map((table) => (
          <div key={table.id} className="item-card">
            <img src={table.image || "/placeholder.svg"} alt={table.name} />
            <div className="item-info">
              <h3>{table.name}</h3>
              <p>Capacity: {table.capacity} people</p>
              <p>Location: {table.location}</p>
              <p>Price: ${table.pricePerHour}/hour</p>
              <div className={`item-status ${table.status}`}>{table.status}</div>
            </div>
            <div className="item-actions">
              <button className="edit-btn" onClick={() => editTable(table)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTable(table.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMenu = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Menu Management</h2>
        <CustomButton
          name="Add New Item"
          onPress={() => {
            setShowAddForm(true)
            setEditingItem(null)
            resetMenuForm()
          }}
        />
      </div>

      {(showAddForm || editingItem) && (
        <div className="form-container">
          <h3>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Item Name"
              value={menuForm.name}
              onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
            />
            <select value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}>
              <option value="">Select Category</option>
              <option value="Coffee">Coffee</option>
              <option value="Tea & Others">Tea & Others</option>
              <option value="Food">Food</option>
              <option value="Desserts">Desserts</option>
            </select>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={menuForm.price}
              onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Rating"
              value={menuForm.rating}
              onChange={(e) => setMenuForm({ ...menuForm, rating: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={menuForm.description}
              onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
            />
            <input
              type="url"
              placeholder="Image URL"
              value={menuForm.image}
              onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={menuForm.popular}
                onChange={(e) => setMenuForm({ ...menuForm, popular: e.target.checked })}
              />
              Popular Item
            </label>
            <select value={menuForm.status} onChange={(e) => setMenuForm({ ...menuForm, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="form-actions">
            <CustomButton
              name={editingItem ? "Update Item" : "Add Item"}
              onPress={editingItem ? updateMenuItem : addMenuItem}
            />
            <button
              className="cancel-btn"
              onClick={() => {
                setShowAddForm(false)
                setEditingItem(null)
                resetMenuForm()
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="items-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image || "/placeholder.svg"} alt={item.name} />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <p>Rating: {item.rating}⭐</p>
              {item.popular && <span className="popular-badge">Popular</span>}
              <div className={`item-status ${item.status}`}>{item.status}</div>
            </div>
            <div className="item-actions">
              <button className="edit-btn" onClick={() => editMenuItem(item)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteMenuItem(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderRooms = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Rooms Management</h2>
        <CustomButton
          name="Add New Room"
          onPress={() => {
            setShowAddForm(true)
            setEditingItem(null)
            resetRoomForm()
          }}
        />
      </div>

      {(showAddForm || editingItem) && (
        <div className="form-container">
          <h3>{editingItem ? "Edit Room" : "Add New Room"}</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Room Name"
              value={roomForm.name}
              onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
            />
            <select value={roomForm.category} onChange={(e) => setRoomForm({ ...roomForm, category: e.target.value })}>
              <option value="">Select Category</option>
              <option value="Meeting Rooms">Meeting Rooms</option>
              <option value="Study Rooms">Study Rooms</option>
              <option value="Private Dining">Private Dining</option>
              <option value="Event Spaces">Event Spaces</option>
            </select>
            <input
              type="number"
              placeholder="Capacity"
              value={roomForm.capacity}
              onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })}
            />
            <input
              type="text"
              placeholder="Size (e.g., 25 sqm)"
              value={roomForm.size}
              onChange={(e) => setRoomForm({ ...roomForm, size: e.target.value })}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price per Hour"
              value={roomForm.pricePerHour}
              onChange={(e) => setRoomForm({ ...roomForm, pricePerHour: e.target.value })}
            />
            <input
              type="url"
              placeholder="Image URL"
              value={roomForm.image}
              onChange={(e) => setRoomForm({ ...roomForm, image: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={roomForm.description}
              onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Amenities (comma separated)"
              value={roomForm.amenities}
              onChange={(e) => setRoomForm({ ...roomForm, amenities: e.target.value })}
            />
            <input
              type="text"
              placeholder="Features (comma separated)"
              value={roomForm.features}
              onChange={(e) => setRoomForm({ ...roomForm, features: e.target.value })}
            />
            <select value={roomForm.status} onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="form-actions">
            <CustomButton
              name={editingItem ? "Update Room" : "Add Room"}
              onPress={editingItem ? updateRoom : addRoom}
            />
            <button
              className="cancel-btn"
              onClick={() => {
                setShowAddForm(false)
                setEditingItem(null)
                resetRoomForm()
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="items-grid">
        {rooms.map((room) => (
          <div key={room.id} className="item-card">
            <img src={room.image || "/placeholder.svg"} alt={room.name} />
            <div className="item-info">
              <h3>{room.name}</h3>
              <p>Category: {room.category}</p>
              <p>Capacity: {room.capacity} people</p>
              <p>Size: {room.size}</p>
              <p>Price: ${room.pricePerHour}/hour</p>
              <div className={`item-status ${room.status}`}>{room.status}</div>
            </div>
            <div className="item-actions">
              <button className="edit-btn" onClick={() => editRoom(room)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteRoom(room.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBookings = () => (
    <div className="admin-section">
      <div className="section-header">
        <h2>Bookings Management</h2>
      </div>
      <div className="bookings-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Item</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.id}</td>
                <td>
                  <div>
                    <strong>{booking.customerName}</strong>
                    <br />
                    <small>{booking.customerEmail}</small>
                  </div>
                </td>
                <td>
                  <span className={`type-badge ${booking.type}`}>{booking.type}</span>
                </td>
                <td>{booking.itemName}</td>
                <td>{booking.date}</td>
                <td>{booking.timeSlot}</td>
                <td>{booking.duration}h</td>
                <td>${booking.totalPrice}</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                    className={`status-select ${booking.status}`}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button className="delete-btn small" onClick={() => deleteBooking(booking.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <h1>☕ CafeBook Admin</h1>
          </div>
          <div className="admin-actions">
            <div className="admin-user-info">
              <img src={adminProfile.avatar || "/placeholder.svg"} alt={adminProfile.name} className="admin-avatar" />
              <div className="admin-details">
                <span className="admin-name">{adminProfile.name}</span>
                <span className="admin-role">{adminProfile.role}</span>
              </div>
            </div>
            <CustomButton name="Logout" onPress={onLogout} />
          </div>
        </div>
      </header>

      <div className="admin-layout">
        {/* Sidebar Navigation */}
        <nav className="admin-sidebar">
          <ul>
            <li>
              <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
                📊 Overview
              </button>
            </li>
            <li>
              <button className={activeTab === "tables" ? "active" : ""} onClick={() => setActiveTab("tables")}>
                🪑 Tables
              </button>
            </li>
            <li>
              <button className={activeTab === "menu" ? "active" : ""} onClick={() => setActiveTab("menu")}>
                🍽️ Menu
              </button>
            </li>
            <li>
              <button className={activeTab === "rooms" ? "active" : ""} onClick={() => setActiveTab("rooms")}>
                🏢 Rooms
              </button>
            </li>
            <li>
              <button className={activeTab === "bookings" ? "active" : ""} onClick={() => setActiveTab("bookings")}>
                📅 Bookings
              </button>
            </li>
            <li>
              <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
                👤 Profile
              </button>
            </li>
            <li>
              <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
                ⚙️ Settings
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="admin-main">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "tables" && renderTables()}
          {activeTab === "menu" && renderMenu()}
          {activeTab === "rooms" && renderRooms()}
          {activeTab === "bookings" && renderBookings()}
          {activeTab === "profile" && renderProfile()}
          {activeTab === "settings" && renderSettings()}
        </main>
      </div>
    </div>
  )
}
