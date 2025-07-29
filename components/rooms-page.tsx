"use client"

import { useState } from "react"
import "./rooms-page.css"

const roomCategories = ["All", "Meeting Rooms", "Study Rooms", "Private Dining", "Event Spaces"]

const rooms = [
  // Meeting Rooms
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
  },
  {
    id: 2,
    name: "Creative Brainstorm Room",
    category: "Meeting Rooms",
    capacity: 6,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop",
    description: "Inspiring space for creative sessions and brainstorming",
    amenities: ["Smart TV", "Writable Walls", "WiFi", "Comfortable Seating", "Coffee Station"],
    pricePerHour: 35,
    size: "20 sqm",
    features: ["Colorful design", "Flexible seating", "Creative tools"],
  },
  {
    id: 3,
    name: "Board Room",
    category: "Meeting Rooms",
    capacity: 12,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
    description: "Elegant boardroom for important meetings and presentations",
    amenities: ["Large Screen", "Video Conferencing", "WiFi", "Premium Furniture", "Catering Service"],
    pricePerHour: 65,
    size: "35 sqm",
    features: ["Executive style", "Premium location", "Full service"],
  },

  // Study Rooms
  {
    id: 4,
    name: "Quiet Study Pod",
    category: "Study Rooms",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    description: "Perfect for focused study sessions and small group work",
    amenities: ["Power Outlets", "WiFi", "Adjustable Lighting", "Comfortable Chairs", "Storage"],
    pricePerHour: 15,
    size: "8 sqm",
    features: ["Sound-proof", "Minimal distractions", "Ergonomic setup"],
  },
  {
    id: 5,
    name: "Group Study Room",
    category: "Study Rooms",
    capacity: 6,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    description: "Collaborative space for group study and project work",
    amenities: ["Whiteboard", "WiFi", "Power Outlets", "Large Table", "Bookshelf"],
    pricePerHour: 25,
    size: "15 sqm",
    features: ["Collaborative setup", "Natural light", "Quiet zone"],
  },
  {
    id: 6,
    name: "Library Study Room",
    category: "Study Rooms",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "Traditional library-style study environment",
    amenities: ["Individual Desks", "WiFi", "Reading Lamps", "Reference Books", "Silence Policy"],
    pricePerHour: 20,
    size: "12 sqm",
    features: ["Library atmosphere", "Individual focus", "Academic setting"],
  },

  // Private Dining
  {
    id: 7,
    name: "Intimate Dining Room",
    category: "Private Dining",
    capacity: 8,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    description: "Elegant private dining for special occasions",
    amenities: ["Full Kitchen Access", "Wine Storage", "Premium Tableware", "Ambient Lighting", "Music System"],
    pricePerHour: 55,
    size: "30 sqm",
    features: ["Romantic ambiance", "Full service", "Customizable menu"],
  },
  {
    id: 8,
    name: "Family Celebration Room",
    category: "Private Dining",
    capacity: 12,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    description: "Perfect for family gatherings and celebrations",
    amenities: ["Large Dining Table", "Kitchen Access", "Entertainment System", "Decoration Options", "Catering"],
    pricePerHour: 70,
    size: "40 sqm",
    features: ["Family-friendly", "Celebration setup", "Full amenities"],
  },

  // Event Spaces
  {
    id: 9,
    name: "Workshop Studio",
    category: "Event Spaces",
    capacity: 20,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    description: "Versatile space for workshops, seminars, and events",
    amenities: ["Projector Setup", "Sound System", "Flexible Seating", "WiFi", "Catering Options"],
    pricePerHour: 85,
    size: "60 sqm",
    features: ["Flexible layout", "Professional setup", "Event support"],
  },
  {
    id: 10,
    name: "Art Gallery Space",
    category: "Event Spaces",
    capacity: 30,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "Beautiful space for exhibitions, launches, and networking",
    amenities: ["Gallery Lighting", "Display Walls", "Sound System", "Bar Setup", "Professional Lighting"],
    pricePerHour: 120,
    size: "80 sqm",
    features: ["Exhibition ready", "Networking setup", "Premium location"],
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
  "8:00 PM",
  "9:00 PM",
]

interface RoomsPageProps {
  roomBookings: any[]
  setRoomBookings: (bookings: any[]) => void
}

export default function RoomsPage({ roomBookings, setRoomBookings }: RoomsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedCapacity, setSelectedCapacity] = useState("All")

  const addRoomBooking = (room, timeSlot, duration = 2) => {
    const booking = {
      id: Date.now(),
      room,
      timeSlot,
      duration,
      date: selectedDate,
      totalPrice: room.pricePerHour * duration,
      status: "confirmed",
      type: "room",
    }

    setRoomBookings((prevBookings) => [...prevBookings, booking])
  }

  const filteredRooms = rooms.filter((room) => {
    const categoryMatch = selectedCategory === "All" || room.category === selectedCategory
    const capacityMatch =
      selectedCapacity === "All" ||
      (selectedCapacity === "1-5" && room.capacity <= 5) ||
      (selectedCapacity === "6-10" && room.capacity >= 6 && room.capacity <= 10) ||
      (selectedCapacity === "11-20" && room.capacity >= 11 && room.capacity <= 20) ||
      (selectedCapacity === "20+" && room.capacity > 20)

    return categoryMatch && capacityMatch
  })

  const capacityFilters = ["All", "1-5", "6-10", "11-20", "20+"]

  return (
    <div className="rooms-page">
      {/* Hero Section */}
      <section className="rooms-hero">
        <div className="rooms-hero-content">
          <h1>Book a Room</h1>
          <p>Professional spaces for meetings, study sessions, dining, and events</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="rooms-filter">
        <div className="container">
          <h2>Find Your Perfect Space</h2>
          <div className="filters">
            <div className="date-filter">
              <label htmlFor="room-date">Select Date:</label>
              <input
                type="date"
                id="room-date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>
            <div className="capacity-filter">
              <label>Capacity:</label>
              <div className="capacity-buttons">
                {capacityFilters.map((capacity) => (
                  <button
                    key={capacity}
                    className={`capacity-btn ${selectedCapacity === capacity ? "active" : ""}`}
                    onClick={() => setSelectedCapacity(capacity)}
                  >
                    {capacity} {capacity !== "All" ? "people" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="container">
          <div className="category-buttons">
            {roomCategories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="rooms-grid-section">
        <div className="container">
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-image">
                  <img src={room.image || "/placeholder.svg"} alt={room.name} />
                  <div className="room-overlay">
                    <div className="time-slots">
                      <h4>Available Times:</h4>
                      <div className="time-grid">
                        {timeSlots.slice(0, 6).map((time) => (
                          <button key={time} className="time-slot" onClick={() => addRoomBooking(room, time)}>
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="room-category-badge">{room.category}</div>
                </div>
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p className="room-description">{room.description}</p>
                  <div className="room-details">
                    <div className="room-detail">
                      <span className="detail-icon">👥</span>
                      <span>Up to {room.capacity} people</span>
                    </div>
                    <div className="room-detail">
                      <span className="detail-icon">📐</span>
                      <span>{room.size}</span>
                    </div>
                  </div>
                  <div className="room-features">
                    <h4>Key Features:</h4>
                    <div className="features-list">
                      {room.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="room-amenities">
                    <h4>Amenities:</h4>
                    <div className="amenities-list">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="amenity-tag">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="amenity-tag more">+{room.amenities.length - 4} more</span>
                      )}
                    </div>
                  </div>
                  <div className="room-price">
                    <span className="price">${room.pricePerHour}</span>
                    <span className="price-unit">/hour</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Types Info */}
      <section className="room-types-info">
        <div className="container">
          <h2>Room Types</h2>
          <div className="room-types-grid">
            <div className="room-type-card">
              <div className="room-type-icon">🏢</div>
              <h3>Meeting Rooms</h3>
              <p>Professional spaces equipped with modern technology for productive meetings and presentations.</p>
              <ul>
                <li>Video conferencing equipment</li>
                <li>Whiteboards and projectors</li>
                <li>High-speed WiFi</li>
                <li>Professional atmosphere</li>
              </ul>
            </div>
            <div className="room-type-card">
              <div className="room-type-icon">📚</div>
              <h3>Study Rooms</h3>
              <p>Quiet, focused environments perfect for individual study or small group collaboration.</p>
              <ul>
                <li>Noise-controlled environment</li>
                <li>Comfortable seating</li>
                <li>Adequate lighting</li>
                <li>Study-friendly amenities</li>
              </ul>
            </div>
            <div className="room-type-card">
              <div className="room-type-icon">🍽️</div>
              <h3>Private Dining</h3>
              <p>Elegant dining spaces for intimate meals, celebrations, and special occasions.</p>
              <ul>
                <li>Full kitchen access</li>
                <li>Premium tableware</li>
                <li>Customizable ambiance</li>
                <li>Catering services</li>
              </ul>
            </div>
            <div className="room-type-card">
              <div className="room-type-icon">🎉</div>
              <h3>Event Spaces</h3>
              <p>Versatile venues for workshops, exhibitions, networking events, and large gatherings.</p>
              <ul>
                <li>Flexible layouts</li>
                <li>Professional AV equipment</li>
                <li>Event support services</li>
                <li>Customizable setup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
