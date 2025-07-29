"use client"

import { useState } from "react"
import CustomButton from "./custom-button"
import "./customer-sidebar.css"

interface CustomerSidebarProps {
  isOpen: boolean
  onClose: () => void
  cart: any[]
  setCart: (cart: any[]) => void
  bookings: any[]
  roomBookings: any[]
  onLogout: () => void
  updateCartQuantity: (itemId: number, newQuantity: number) => void
  removeFromCart: (itemId: number) => void
  updateBookingDuration: (bookingId: number, newDuration: number) => void
  removeBooking: (bookingId: number) => void
  updateRoomBookingDuration: (bookingId: number, newDuration: number) => void
  removeRoomBooking: (bookingId: number) => void
}

export default function CustomerSidebar({
  isOpen,
  onClose,
  cart,
  setCart,
  bookings,
  roomBookings,
  onLogout,
  updateCartQuantity,
  removeFromCart,
  updateBookingDuration,
  removeBooking,
  updateRoomBookingDuration,
  removeRoomBooking,
}: CustomerSidebarProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)

  // Customer profile state
  const [customerProfile, setCustomerProfile] = useState({
    id: 1,
    name: "John Customer",
    email: "john@example.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "2023-06-15",
    lastVisit: new Date().toISOString(),
    loyaltyPoints: 250,
    totalOrders: 42,
    favoriteItems: ["Signature Espresso Blend", "Caramel Macchiato"],
    preferences: {
      dietaryRestrictions: ["None"],
      favoriteTable: "Window Table for 2",
      preferredTime: "Morning",
    },
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
  })

  // Customer settings state
  const [customerSettings, setCustomerSettings] = useState({
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      bookingReminders: true,
      promotionalEmails: false,
      orderUpdates: true,
    },
    preferences: {
      language: "English",
      timezone: "America/New_York",
      currency: "USD",
      theme: "Light",
      autoSaveCart: true,
      defaultBookingDuration: 2,
    },
    privacy: {
      profileVisibility: "Private",
      shareOrderHistory: false,
      allowRecommendations: true,
      dataCollection: false,
    },
  })

  const [profileForm, setProfileForm] = useState({ ...customerProfile })
  const [settingsForm, setSettingsForm] = useState({ ...customerSettings })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Calculate totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getBookingTotal = () => {
    return bookings.reduce((total, booking) => total + booking.totalPrice, 0)
  }

  const getRoomBookingTotal = () => {
    return roomBookings.reduce((total, booking) => total + booking.totalPrice, 0)
  }

  const getTotalSpent = () => {
    return getCartTotal() + getBookingTotal() + getRoomBookingTotal()
  }

  // Profile management functions
  const updateProfile = () => {
    setCustomerProfile({ ...profileForm })
    setShowProfileEdit(false)
    alert("Profile updated successfully!")
  }

  const updateSettings = () => {
    setCustomerSettings({ ...settingsForm })
    alert("Settings updated successfully!")
  }

  const changePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    if (passwordForm.currentPassword !== "customer123") {
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

  const renderOverview = () => (
    <div className="customer-overview">
      <div className="customer-header">
        <div className="customer-avatar">
          <img src={customerProfile.avatar || "/placeholder.svg"} alt={customerProfile.name} />
        </div>
        <div className="customer-info">
          <h3>{customerProfile.name}</h3>
          <p>{customerProfile.email}</p>
          <div className="loyalty-points">
            <span className="points-icon">⭐</span>
            <span>{customerProfile.loyaltyPoints} Points</span>
          </div>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <span className="stat-number">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            <span className="stat-label">Cart Items</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <span className="stat-number">{bookings.length + roomBookings.length}</span>
            <span className="stat-label">Bookings</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <span className="stat-number">${getTotalSpent().toFixed(2)}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h4>Recent Activity</h4>
        <div className="activity-list">
          {cart.length > 0 && (
            <div className="activity-item">
              <span className="activity-icon">🛒</span>
              <span className="activity-text">Added {cart.length} items to cart</span>
              <span className="activity-time">Now</span>
            </div>
          )}
          {bookings.length > 0 && (
            <div className="activity-item">
              <span className="activity-icon">🪑</span>
              <span className="activity-text">Booked {bookings.length} tables</span>
              <span className="activity-time">Today</span>
            </div>
          )}
          {roomBookings.length > 0 && (
            <div className="activity-item">
              <span className="activity-icon">🏢</span>
              <span className="activity-text">Reserved {roomBookings.length} rooms</span>
              <span className="activity-time">Today</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderCart = () => (
    <div className="customer-cart">
      <h4>Shopping Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</h4>
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <p>Your cart is empty</p>
            <small>Add some delicious items to get started!</small>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image || "/placeholder.svg"} alt={item.name} />
              <div className="item-details">
                <h5>{item.name}</h5>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                ✕
              </button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">
            <strong>Total: ${getCartTotal().toFixed(2)}</strong>
          </div>
          <CustomButton name="Checkout" onPress={() => alert("Checkout functionality coming soon!")} />
        </div>
      )}
    </div>
  )

  const renderBookings = () => (
    <div className="customer-bookings">
      <h4>My Bookings</h4>

      {/* Table Bookings */}
      <div className="booking-section">
        <h5>Table Reservations ({bookings.length})</h5>
        <div className="booking-items">
          {bookings.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🪑</span>
              <p>No table bookings</p>
              <small>Reserve a table to enjoy our cozy atmosphere!</small>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <img src={booking.table.image || "/placeholder.svg"} alt={booking.table.name} />
                <div className="booking-details">
                  <h5>{booking.table.name}</h5>
                  <p>📅 {booking.date}</p>
                  <p>🕐 {booking.timeSlot}</p>
                  <p>👥 {booking.table.capacity} people</p>
                  <p>💰 ${booking.table.pricePerHour}/hour</p>
                  <div className="duration-controls">
                    <label>Duration (hours):</label>
                    <button onClick={() => updateBookingDuration(booking.id, booking.duration - 1)}>-</button>
                    <span>{booking.duration}</span>
                    <button onClick={() => updateBookingDuration(booking.id, booking.duration + 1)}>+</button>
                  </div>
                  <p className="booking-total">Total: ${booking.totalPrice}</p>
                </div>
                <button className="remove-booking" onClick={() => removeBooking(booking.id)}>
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Room Bookings */}
      <div className="booking-section">
        <h5>Room Reservations ({roomBookings.length})</h5>
        <div className="booking-items">
          {roomBookings.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🏢</span>
              <p>No room bookings</p>
              <small>Book a room for meetings or private events!</small>
            </div>
          ) : (
            roomBookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <img src={booking.room.image || "/placeholder.svg"} alt={booking.room.name} />
                <div className="booking-details">
                  <h5>{booking.room.name}</h5>
                  <p>📅 {booking.date}</p>
                  <p>🕐 {booking.timeSlot}</p>
                  <p>👥 {booking.room.capacity} people</p>
                  <p>💰 ${booking.room.pricePerHour}/hour</p>
                  <div className="duration-controls">
                    <label>Duration (hours):</label>
                    <button onClick={() => updateRoomBookingDuration(booking.id, booking.duration - 1)}>-</button>
                    <span>{booking.duration}</span>
                    <button onClick={() => updateRoomBookingDuration(booking.id, booking.duration + 1)}>+</button>
                  </div>
                  <p className="booking-total">Total: ${booking.totalPrice}</p>
                </div>
                <button className="remove-booking" onClick={() => removeRoomBooking(booking.id)}>
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {(bookings.length > 0 || roomBookings.length > 0) && (
        <div className="bookings-summary">
          <div className="bookings-total">
            <strong>Total Bookings: ${(getBookingTotal() + getRoomBookingTotal()).toFixed(2)}</strong>
          </div>
          <CustomButton name="Confirm All Bookings" onPress={() => alert("Booking confirmation coming soon!")} />
        </div>
      )}
    </div>
  )

  const renderProfile = () => (
    <div className="customer-profile">
      <div className="profile-header">
        <h4>My Profile</h4>
        <button className="edit-profile-btn" onClick={() => setShowProfileEdit(!showProfileEdit)}>
          {showProfileEdit ? "Cancel" : "Edit"}
        </button>
      </div>

      {!showProfileEdit ? (
        <div className="profile-view">
          <div className="profile-avatar-section">
            <img src={customerProfile.avatar || "/placeholder.svg"} alt={customerProfile.name} />
            <div className="profile-basic-info">
              <h5>{customerProfile.name}</h5>
              <p>{customerProfile.email}</p>
              <p>{customerProfile.phone}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <div>
                <strong>{customerProfile.loyaltyPoints}</strong>
                <small>Loyalty Points</small>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📦</span>
              <div>
                <strong>{customerProfile.totalOrders}</strong>
                <small>Total Orders</small>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h6>Personal Information</h6>
              <p>
                <strong>Member Since:</strong> {new Date(customerProfile.joinDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Last Visit:</strong> {new Date(customerProfile.lastVisit).toLocaleDateString()}
              </p>
            </div>

            <div className="detail-section">
              <h6>Address</h6>
              <p>{customerProfile.address.street}</p>
              <p>
                {customerProfile.address.city}, {customerProfile.address.state} {customerProfile.address.zipCode}
              </p>
            </div>

            <div className="detail-section">
              <h6>Preferences</h6>
              <p>
                <strong>Favorite Table:</strong> {customerProfile.preferences.favoriteTable}
              </p>
              <p>
                <strong>Preferred Time:</strong> {customerProfile.preferences.preferredTime}
              </p>
              <p>
                <strong>Dietary Restrictions:</strong> {customerProfile.preferences.dietaryRestrictions.join(", ")}
              </p>
            </div>

            <div className="detail-section">
              <h6>Favorite Items</h6>
              <div className="favorite-items">
                {customerProfile.favoriteItems.map((item, index) => (
                  <span key={index} className="favorite-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="profile-edit">
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
              <label>Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                value={profileForm.address.street}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    address: { ...profileForm.address, street: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={profileForm.address.city}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    address: { ...profileForm.address, city: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                value={profileForm.address.state}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    address: { ...profileForm.address, state: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                value={profileForm.address.zipCode}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    address: { ...profileForm.address, zipCode: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Favorite Table</label>
              <select
                value={profileForm.preferences.favoriteTable}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    preferences: { ...profileForm.preferences, favoriteTable: e.target.value },
                  })
                }
              >
                <option value="Window Table for 2">Window Table for 2</option>
                <option value="Cozy Corner Booth">Cozy Corner Booth</option>
                <option value="Central Table for 6">Central Table for 6</option>
                <option value="Quiet Study Nook">Quiet Study Nook</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Time</label>
              <select
                value={profileForm.preferences.preferredTime}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    preferences: { ...profileForm.preferences, preferredTime: e.target.value },
                  })
                }
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <CustomButton name="Save Changes" onPress={updateProfile} />
            <button
              className="cancel-btn"
              onClick={() => {
                setProfileForm({ ...customerProfile })
                setShowProfileEdit(false)
              }}
            >
              Cancel
            </button>
          </div>

          <div className="password-section">
            <button className="change-password-btn" onClick={() => setShowPasswordChange(!showPasswordChange)}>
              {showPasswordChange ? "Cancel Password Change" : "Change Password"}
            </button>

            {showPasswordChange && (
              <div className="password-form">
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
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="customer-settings">
      <h4>Settings</h4>

      <div className="settings-section">
        <h5>Notifications</h5>
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
                checked={settingsForm.notifications.bookingReminders}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    notifications: { ...settingsForm.notifications, bookingReminders: e.target.checked },
                  })
                }
              />
              <span className="toggle-slider"></span>
              Booking Reminders
            </label>
          </div>
          <div className="toggle-item">
            <label>
              <input
                type="checkbox"
                checked={settingsForm.notifications.promotionalEmails}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    notifications: { ...settingsForm.notifications, promotionalEmails: e.target.checked },
                  })
                }
              />
              <span className="toggle-slider"></span>
              Promotional Emails
            </label>
          </div>
          <div className="toggle-item">
            <label>
              <input
                type="checkbox"
                checked={settingsForm.notifications.orderUpdates}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    notifications: { ...settingsForm.notifications, orderUpdates: e.target.checked },
                  })
                }
              />
              <span className="toggle-slider"></span>
              Order Updates
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h5>Preferences</h5>
        <div className="form-grid">
          <div className="form-group">
            <label>Language</label>
            <select
              value={settingsForm.preferences.language}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  preferences: { ...settingsForm.preferences, language: e.target.value },
                })
              }
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select
              value={settingsForm.preferences.timezone}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  preferences: { ...settingsForm.preferences, timezone: e.target.value },
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
              value={settingsForm.preferences.currency}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  preferences: { ...settingsForm.preferences, currency: e.target.value },
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
            <label>Default Booking Duration (hours)</label>
            <select
              value={settingsForm.preferences.defaultBookingDuration}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  preferences: { ...settingsForm.preferences, defaultBookingDuration: Number.parseInt(e.target.value) },
                })
              }
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              <option value={4}>4 hours</option>
            </select>
          </div>
        </div>
        <div className="settings-toggles">
          <div className="toggle-item">
            <label>
              <input
                type="checkbox"
                checked={settingsForm.preferences.autoSaveCart}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    preferences: { ...settingsForm.preferences, autoSaveCart: e.target.checked },
                  })
                }
              />
              <span className="toggle-slider"></span>
              Auto-save Cart
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h5>Privacy</h5>
        <div className="form-grid">
          <div className="form-group">
            <label>Profile Visibility</label>
            <select
              value={settingsForm.privacy.profileVisibility}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  privacy: { ...settingsForm.privacy, profileVisibility: e.target.value },
                })
              }
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Friends">Friends Only</option>
            </select>
          </div>
        </div>
        <div className="settings-toggles">
          <div className="toggle-item">
            <label>
              <input
                type="checkbox"
                checked={settingsForm.privacy.shareOrderHistory}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    privacy: { ...settingsForm.privacy, shareOrderHistory: e.target.checked },
                  })
                }
              />
              <span className="toggle-slider"></span>
              Share Order History
            </label>
          </div>
          <div className="toggle-item">
            <label>
              <input
                type="checkbox"
                checked={settingsForm.privacy.allowRecommendations}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    privacy: { ...settingsForm.privacy, allowRecommendations: e.target.checked },
                  })
                }
              />
              <span className="toggle-slider"></span>
              Allow Personalized Recommendations
            </label>
          </div>
          <div className="toggle-item">
            <label>
              <input
                type="checkbox"
                checked={settingsForm.privacy.dataCollection}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    privacy: { ...settingsForm.privacy, dataCollection: e.target.checked },
                  })
                }
              />
              <span className="toggle-slider"></span>
              Allow Data Collection for Analytics
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <CustomButton name="Save Settings" onPress={updateSettings} />
        <button className="cancel-btn" onClick={() => setSettingsForm({ ...customerSettings })}>
          Reset
        </button>
      </div>
    </div>
  )

  return (
    <div className={`customer-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>My Account</h3>
        <button className="close-sidebar" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="sidebar-nav">
        <button
          className={`nav-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <span className="nav-icon">📊</span>
          Overview
        </button>
        <button className={`nav-btn ${activeTab === "cart" ? "active" : ""}`} onClick={() => setActiveTab("cart")}>
          <span className="nav-icon">🛒</span>
          Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </button>
        <button
          className={`nav-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          <span className="nav-icon">📅</span>
          Bookings ({bookings.length + roomBookings.length})
        </button>
        <button
          className={`nav-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <span className="nav-icon">👤</span>
          Profile
        </button>
        <button
          className={`nav-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <span className="nav-icon">⚙️</span>
          Settings
        </button>
      </div>

      <div className="sidebar-content">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "cart" && renderCart()}
        {activeTab === "bookings" && renderBookings()}
        {activeTab === "profile" && renderProfile()}
        {activeTab === "settings" && renderSettings()}
      </div>

      <div className="sidebar-footer">
        <CustomButton name="Logout" onPress={onLogout} />
      </div>
    </div>
  )
}
