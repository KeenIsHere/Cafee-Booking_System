"use client"

import { useState } from "react"
import CustomButton from "./custom-button"
import "./auth-pages.css"

interface AuthPagesProps {
  onLogin: (email: string, password: string) => void
  onRegister: (userData: any) => void
}

export default function AuthPages({ onLogin, onRegister }: AuthPagesProps) {
  const [isSignIn, setIsSignIn] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Sign In Form State
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Registration Form State
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })

  // Form Validation State
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation Functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors = {}

    if (!signInForm.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(signInForm.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!signInForm.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        onLogin(signInForm.email, signInForm.password)
        setIsLoading(false)
      }, 1500)
    } else {
      setIsLoading(false)
    }
  }

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors = {}

    if (!registerForm.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!registerForm.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!registerForm.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(registerForm.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!registerForm.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(registerForm.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!registerForm.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(registerForm.password)) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!registerForm.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    }

    if (!registerForm.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        onRegister({
          name: `${registerForm.firstName} ${registerForm.lastName}`,
          email: registerForm.email,
          phone: registerForm.phone,
          dateOfBirth: registerForm.dateOfBirth,
          subscribeNewsletter: registerForm.subscribeNewsletter,
        })
        setIsLoading(false)
      }, 2000)
    } else {
      setIsLoading(false)
    }
  }

  // Social Login Handler
  const handleSocialLogin = (provider) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      alert(`${provider} login would be implemented here`)
      setIsLoading(false)
    }, 1000)
  }

  // Forgot Password Handler
  const handleForgotPassword = () => {
    if (!signInForm.email) {
      setErrors({ email: "Please enter your email first" })
      return
    }

    if (!validateEmail(signInForm.email)) {
      setErrors({ email: "Please enter a valid email" })
      return
    }

    alert(`Password reset link sent to ${signInForm.email}`)
  }

  return (
    <div className="auth-container">
      {/* Background Elements */}
      <div className="auth-background">
        <div className="coffee-beans">
          <div className="bean bean-1">☕</div>
          <div className="bean bean-2">☕</div>
          <div className="bean bean-3">☕</div>
          <div className="bean bean-4">☕</div>
          <div className="bean bean-5">☕</div>
          <div className="bean bean-6">☕</div>
        </div>
        <div className="gradient-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="auth-content">
        {/* Logo Section */}
        <div className="auth-logo">
          <div className="logo-icon">☕</div>
          <h1>CafeBook</h1>
          <p>Where great coffee meets comfortable spaces</p>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Tab Switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isSignIn ? "active" : ""}`}
              onClick={() => {
                setIsSignIn(true)
                setErrors({})
              }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${!isSignIn ? "active" : ""}`}
              onClick={() => {
                setIsSignIn(false)
                setErrors({})
              }}
            >
              Register
            </button>
          </div>

          {/* Sign In Form */}
          {isSignIn ? (
            <form onSubmit={handleSignIn} className="auth-form">
              <div className="form-header">
                <h2>Welcome Back!</h2>
                <p>Sign in to your account to continue</p>
              </div>

              <div className="form-group">
                <label htmlFor="signin-email">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="signin-email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email"
                  />
                  <span className="input-icon">📧</span>
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="signin-password">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signin-password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    className={errors.password ? "error" : ""}
                    placeholder="Enter your password"
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={signInForm.rememberMe}
                    onChange={(e) => setSignInForm({ ...signInForm, rememberMe: e.target.checked })}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <button type="button" className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>

              <CustomButton name={isLoading ? "Signing In..." : "Sign In"} onPress={() => {}} disabled={isLoading} />

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="social-login">
                <button
                  type="button"
                  className="social-btn google"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                >
                  <span className="social-icon">🔍</span>
                  Google
                </button>
                <button
                  type="button"
                  className="social-btn facebook"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={isLoading}
                >
                  <span className="social-icon">📘</span>
                  Facebook
                </button>
              </div>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-header">
                <h2>Join CafeBook!</h2>
                <p>Create your account to start booking</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="register-firstname">First Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="register-firstname"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                      className={errors.firstName ? "error" : ""}
                      placeholder="First name"
                    />
                    <span className="input-icon">👤</span>
                  </div>
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-lastname">Last Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="register-lastname"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      className={errors.lastName ? "error" : ""}
                      placeholder="Last name"
                    />
                    <span className="input-icon">👤</span>
                  </div>
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-email">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="register-email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email"
                  />
                  <span className="input-icon">📧</span>
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="register-phone">Phone Number</label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    id="register-phone"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className={errors.phone ? "error" : ""}
                    placeholder="Enter your phone number"
                  />
                  <span className="input-icon">📱</span>
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="register-dob">Date of Birth</label>
                <div className="input-wrapper">
                  <input
                    type="date"
                    id="register-dob"
                    value={registerForm.dateOfBirth}
                    onChange={(e) => setRegisterForm({ ...registerForm, dateOfBirth: e.target.value })}
                    className={errors.dateOfBirth ? "error" : ""}
                  />
                  <span className="input-icon">🎂</span>
                </div>
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="register-password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className={errors.password ? "error" : ""}
                      placeholder="Create password"
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-confirm-password">Confirm Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="register-confirm-password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className={errors.confirmPassword ? "error" : ""}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-checkboxes">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={registerForm.agreeToTerms}
                    onChange={(e) => setRegisterForm({ ...registerForm, agreeToTerms: e.target.checked })}
                  />
                  <span className="checkmark"></span>I agree to the{" "}
                  <a href="#" className="link">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="link">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={registerForm.subscribeNewsletter}
                    onChange={(e) => setRegisterForm({ ...registerForm, subscribeNewsletter: e.target.checked })}
                  />
                  <span className="checkmark"></span>
                  Subscribe to our newsletter for special offers and updates
                </label>
              </div>

              <CustomButton
                name={isLoading ? "Creating Account..." : "Create Account"}
                onPress={() => {}}
                disabled={isLoading}
              />

              <div className="divider">
                <span>or register with</span>
              </div>

              <div className="social-login">
                <button
                  type="button"
                  className="social-btn google"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                >
                  <span className="social-icon">🔍</span>
                  Google
                </button>
                <button
                  type="button"
                  className="social-btn facebook"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={isLoading}
                >
                  <span className="social-icon">📘</span>
                  Facebook
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p>&copy; 2024 CafeBook. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="coffee-cup">☕</div>
            <div className="loading-text">{isSignIn ? "Signing you in..." : "Creating your account..."}</div>
          </div>
        </div>
      )}
    </div>
  )
}
