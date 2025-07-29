"use client"

import { useState } from "react"
import CustomButton from "./components/custom-button"
import { useAuthContext, AuthProvider } from "./context/use-auth-context"
import MenuPage from "./components/menu-page"
import AboutPage from "./components/about-page"
import ContactPage from "./components/contact-page"
import RoomsPage from "./components/rooms-page"
import AdminDashboard from "./components/admin-dashboard"
import CustomerSidebar from "./components/customer-sidebar"
import AuthPages from "./components/auth-pages"
import "./home-page.css"

// Sample table data
const tables = [
  {
    id: 1,
    name: "Window Table for 2",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=300&fit=crop",
    location: "By the window",
    amenities: ["Natural light", "Street view"],
    pricePerHour: 15,
  },
  {
    id: 2,
    name: "Cozy Corner Booth",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=300&fit=crop",
    location: "Corner section",
    amenities: ["Private seating", "Comfortable cushions"],
    pricePerHour: 25,
  },
  {
    id: 3,
    name: "Central Table for 6",
    capacity: 6,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop",
    location: "Main dining area",
    amenities: ["Spacious", "Great for groups"],
    pricePerHour: 35,
  },
  {
    id: 4,
    name: "Quiet Study Nook",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=300&h=300&fit=crop",
    location: "Quiet zone",
    amenities: ["WiFi", "Power outlets", "Quiet atmosphere"],
    pricePerHour: 20,
  },
  {
    id: 5,
    name: "Outdoor Patio Table",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop",
    location: "Outdoor patio",
    amenities: ["Fresh air", "Garden view"],
    pricePerHour: 30,
  },
  {
    id: 6,
    name: "Bar Counter Seats",
    capacity: 3,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=300&fit=crop",
    location: "Coffee bar",
    amenities: ["Watch baristas work", "Quick service"],
    pricePerHour: 18,
  },
]

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
]

const capacityFilters = ["All", "2 seats", "3-4 seats", "5+ seats"]

function HomePage() {
  const { logout } = useAuthContext()
  const [bookings, setBookings] = useState([])
  const [cart, setCart] = useState([])
  const [roomBookings, setRoomBookings] = useState([])
  const [selectedCapacity, setSelectedCapacity] = useState("All")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [currentPage, setCurrentPage] = useState("home")
  const [isAdmin, setIsAdmin] = useState(false)
  const [showCustomerSidebar, setShowCustomerSidebar] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Authentication handlers
  const handleLogin = (email, password) => {
    // Simulate authentication
    const user = {
      id: 1,
      name: "John Customer",
      email: email,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    }
    setCurrentUser(user)
    setIsAuthenticated(true)
    alert(`Welcome back, ${user.name}!`)
  }

  const handleRegister = (userData) => {
    // Simulate registration
    const user = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    }
    setCurrentUser(user)
    setIsAuthenticated(true)
    alert(`Welcome to CafeBook, ${user.name}! Your account has been created successfully.`)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setBookings([])
    setCart([])
    setRoomBookings([])
    setShowCustomerSidebar(false)
    setCurrentPage("home")
    logout()
  }

  // If not authenticated, show auth pages
  if (!isAuthenticated) {
    return <AuthPages onLogin={handleLogin} onRegister={handleRegister} />
  }

  const addBooking = (table, timeSlot, duration = 2) => {
    const booking = {
      id: Date.now(),
      table,
      timeSlot,
      duration,
      date: selectedDate,
      totalPrice: table.pricePerHour * duration,
      status: "confirmed",
    }

    setBookings((prevBookings) => [...prevBookings, booking])
  }

  const removeBooking = (bookingId) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId))
  }

  const updateBookingDuration = (bookingId, newDuration) => {
    if (newDuration <= 0) {
      removeBooking(bookingId)
      return
    }

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              duration: newDuration,
              totalPrice: booking.table.pricePerHour * newDuration,
            }
          : booking,
      ),
    )
  }

  const getTotalCost = () => {
    return bookings.reduce((total, booking) => total + booking.totalPrice, 0)
  }

  // Cart functions
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const removeRoomBooking = (bookingId) => {
    setRoomBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId))
  }

  const updateRoomBookingDuration = (bookingId, newDuration) => {
    if (newDuration <= 0) {
      removeRoomBooking(bookingId)
      return
    }

    setRoomBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              duration: newDuration,
              totalPrice: booking.room.pricePerHour * newDuration,
            }
          : booking,
      ),
    )
  }

  const getRoomBookingTotal = () => {
    return roomBookings.reduce((total, booking) => total + booking.totalPrice, 0)
  }

  const filteredTables =
    selectedCapacity === "All"
      ? tables
      : tables.filter((table) => {
          if (selectedCapacity === "2 seats") return table.capacity === 2
          if (selectedCapacity === "3-4 seats") return table.capacity >= 3 && table.capacity <= 4
          if (selectedCapacity === "5+ seats") return table.capacity >= 5
          return true
        })

  const bookingCount = bookings.length
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const roomBookingCount = roomBookings.length

  // Admin access handler
  const handleAdminAccess = () => {
    // In a real app, this would be proper authentication
    const adminPassword = prompt("Enter admin password:")
    if (adminPassword === "admin123") {
      setIsAdmin(true)
      setCurrentPage("admin")
    } else {
      alert("Invalid admin password!")
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    setCurrentPage("home")
  }

  // If admin is logged in, show admin dashboard
  if (isAdmin && currentPage === "admin") {
    return <AdminDashboard onLogout={handleAdminLogout} />
  }

  // Common header component
  const renderHeader = () => (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>☕ CafeBook</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="#" onClick={() => setCurrentPage("home")} className={currentPage === "home" ? "active" : ""}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setCurrentPage("tables")} className={currentPage === "tables" ? "active" : ""}>
                Tables
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setCurrentPage("menu")} className={currentPage === "menu" ? "active" : ""}>
                Menu
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setCurrentPage("about")} className={currentPage === "about" ? "active" : ""}>
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setCurrentPage("contact")}
                className={currentPage === "contact" ? "active" : ""}
              >
                Contact
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setCurrentPage("rooms")} className={currentPage === "rooms" ? "active" : ""}>
                Rooms
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <div
            className="mobile-menu-btn"
            onClick={() => document.getElementById("mobile-nav")?.classList.toggle("open")}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          {/* Admin Access Button */}
          <button className="admin-access-btn" onClick={handleAdminAccess} title="Admin Access">
            ⚙️
          </button>
          {/* Customer Account Button */}
          <button className="customer-account-btn" onClick={() => setShowCustomerSidebar(true)} title="My Account">
            <div className="account-info">
              <img src={currentUser?.avatar || "/placeholder.svg"} alt="Profile" />
              <div className="notification-badges">
                {cartItemCount > 0 && <span className="badge cart-badge">{cartItemCount}</span>}
                {bookingCount + roomBookingCount > 0 && (
                  <span className="badge booking-badge">{bookingCount + roomBookingCount}</span>
                )}
              </div>
            </div>
          </button>
          <CustomButton onPress={handleLogout} name="Logout" />
        </div>
      </div>
    </header>
  )

  // Common mobile nav component
  const renderMobileNav = () => (
    <div id="mobile-nav" className="mobile-nav">
      <div className="mobile-nav-content">
        <div className="mobile-nav-header">
          <h2>☕ CafeBook</h2>
          <button
            className="close-mobile-nav"
            onClick={() => document.getElementById("mobile-nav")?.classList.remove("open")}
          >
            ✕
          </button>
        </div>
        <nav className="mobile-nav-links">
          <a
            href="#"
            onClick={() => {
              setCurrentPage("home")
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            🏠 Home
          </a>
          <a
            href="#"
            onClick={() => {
              setCurrentPage("tables")
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            🪑 Tables
          </a>
          <a
            href="#"
            onClick={() => {
              setCurrentPage("menu")
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            🍽️ Menu
          </a>
          <a
            href="#"
            onClick={() => {
              setCurrentPage("about")
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            ℹ️ About
          </a>
          <a
            href="#"
            onClick={() => {
              setCurrentPage("contact")
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            📞 Contact
          </a>
          <a
            href="#"
            onClick={() => {
              setCurrentPage("rooms")
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            🏢 Rooms
          </a>
          <div className="mobile-nav-divider"></div>
          <a
            href="#"
            onClick={() => {
              setShowCustomerSidebar(true)
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            👤 My Account
          </a>
          <a
            href="#"
            onClick={() => {
              handleAdminAccess()
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            ⚙️ Admin Access
          </a>
          <a
            href="#"
            onClick={() => {
              handleLogout()
              document.getElementById("mobile-nav")?.classList.remove("open")
            }}
          >
            🚪 Logout
          </a>
        </nav>
      </div>
    </div>
  )

  // Render different pages based on currentPage state
  if (currentPage === "menu") {
    return (
      <div className="cafe-home">
        {renderHeader()}
        {renderMobileNav()}
        <MenuPage cart={cart} setCart={setCart} />
        {/* Customer Sidebar */}
        <CustomerSidebar
          isOpen={showCustomerSidebar}
          onClose={() => setShowCustomerSidebar(false)}
          cart={cart}
          setCart={setCart}
          bookings={bookings}
          roomBookings={roomBookings}
          onLogout={handleLogout}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          updateBookingDuration={updateBookingDuration}
          removeBooking={removeBooking}
          updateRoomBookingDuration={updateRoomBookingDuration}
          removeRoomBooking={removeRoomBooking}
        />
      </div>
    )
  }

  if (currentPage === "about") {
    return (
      <div className="cafe-home">
        {renderHeader()}
        {renderMobileNav()}
        <AboutPage />
        {/* Customer Sidebar */}
        <CustomerSidebar
          isOpen={showCustomerSidebar}
          onClose={() => setShowCustomerSidebar(false)}
          cart={cart}
          setCart={setCart}
          bookings={bookings}
          roomBookings={roomBookings}
          onLogout={handleLogout}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          updateBookingDuration={updateBookingDuration}
          removeBooking={removeBooking}
          updateRoomBookingDuration={updateRoomBookingDuration}
          removeRoomBooking={removeRoomBooking}
        />
      </div>
    )
  }

  if (currentPage === "contact") {
    return (
      <div className="cafe-home">
        {renderHeader()}
        {renderMobileNav()}
        <ContactPage />
        {/* Customer Sidebar */}
        <CustomerSidebar
          isOpen={showCustomerSidebar}
          onClose={() => setShowCustomerSidebar(false)}
          cart={cart}
          setCart={setCart}
          bookings={bookings}
          roomBookings={roomBookings}
          onLogout={handleLogout}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          updateBookingDuration={updateBookingDuration}
          removeBooking={removeBooking}
          updateRoomBookingDuration={updateRoomBookingDuration}
          removeRoomBooking={removeRoomBooking}
        />
      </div>
    )
  }

  if (currentPage === "rooms") {
    return (
      <div className="cafe-home">
        {renderHeader()}
        {renderMobileNav()}
        <RoomsPage roomBookings={roomBookings} setRoomBookings={setRoomBookings} />
        {/* Customer Sidebar */}
        <CustomerSidebar
          isOpen={showCustomerSidebar}
          onClose={() => setShowCustomerSidebar(false)}
          cart={cart}
          setCart={setCart}
          bookings={bookings}
          roomBookings={roomBookings}
          onLogout={handleLogout}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          updateBookingDuration={updateBookingDuration}
          removeBooking={removeBooking}
          updateRoomBookingDuration={updateRoomBookingDuration}
          removeRoomBooking={removeRoomBooking}
        />
      </div>
    )
  }

  return (
    <div className="cafe-home">
      {/* Header */}
      {renderHeader()}
      {renderMobileNav()}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome back, {currentUser?.name}!</h1>
          <p>Book a table at our cozy coffee cafe and enjoy premium coffee in comfort</p>
          <CustomButton
            name="Book Now"
            onPress={() => document.getElementById("tables")?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>
      </section>

      {/* Date and Capacity Filter */}
      <section className="filter-section">
        <div className="container">
          <h2>Find Your Table</h2>
          <div className="filters">
            <div className="date-filter">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>
            <div className="capacity-buttons">
              {capacityFilters.map((capacity) => (
                <button
                  key={capacity}
                  className={`capacity-btn ${selectedCapacity === capacity ? "active" : ""}`}
                  onClick={() => setSelectedCapacity(capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tables Section */}
      <section id="tables" className="tables-section">
        <div className="container">
          <h2>Available Tables</h2>
          <div className="tables-grid">
            {filteredTables.map((table) => (
              <div key={table.id} className="table-card">
                <div className="table-image">
                  <img src={table.image || "/placeholder.svg"} alt={table.name} />
                  <div className="table-overlay">
                    <div className="time-slots">
                      <h4>Available Times:</h4>
                      <div className="time-grid">
                        {timeSlots.slice(0, 4).map((time) => (
                          <button key={time} className="time-slot" onClick={() => addBooking(table, time)}>
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-info">
                  <h3>{table.name}</h3>
                  <p className="table-location">📍 {table.location}</p>
                  <p className="table-capacity">👥 Seats {table.capacity} people</p>
                  <div className="table-amenities">
                    {table.amenities.map((amenity) => (
                      <span key={amenity} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="table-price">${table.pricePerHour}/hour</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Sidebar */}
      <CustomerSidebar
        isOpen={showCustomerSidebar}
        onClose={() => setShowCustomerSidebar(false)}
        cart={cart}
        setCart={setCart}
        bookings={bookings}
        roomBookings={roomBookings}
        onLogout={handleLogout}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        updateBookingDuration={updateBookingDuration}
        removeBooking={removeBooking}
        updateRoomBookingDuration={updateRoomBookingDuration}
        removeRoomBooking={removeRoomBooking}
      />
    </div>
  )
}

// Wrap the HomePage with AuthProvider
export default function HomePageWithAuth() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
}
