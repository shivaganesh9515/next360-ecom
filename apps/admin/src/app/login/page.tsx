'use client'

import { useState } from 'react'
import { ShieldCheck, Eye, EyeOff, Loader2, Lock, Mail, ArrowRight, Fingerprint } from 'lucide-react'
import { authService } from '../../services/authService'
import { useAdminAuthStore } from '../../store/adminAuthStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { handleAuthRedirect } from '../../utils/auth-redirect'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const router = useRouter()
  const { login } = useAdminAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { user, token } = await authService.login(email, password)
      if (user.role !== 'ADMIN') {
        toast.error('Unauthorized. This portal is for administrators only.')
        handleAuthRedirect(user.role, router.push)
        return
      }
      login(user, token)
      toast.success('Welcome back, Commander! 🛡️')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-25px, 15px) scale(1); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, 25px) scale(1.15); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes btnShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .login-page input::placeholder { color: rgba(255,255,255,0.18); }
        .login-page input:focus { outline: none; }
        .login-btn:hover .btn-shimmer { animation: btnShimmer 1.5s infinite; }
        .login-btn:hover { box-shadow: 0 6px 32px rgba(124,179,66,0.35); transform: translateY(-1px); }
        .login-btn:active { transform: translateY(0) scale(0.985); }
      `}</style>

      <div className="login-page" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: '#050505',
        fontFamily: 'var(--font-dm-sans, "DM Sans", system-ui, sans-serif)',
      }}>
        {/* Animated orbs */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-80px',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,179,66,0.06) 0%, transparent 70%)',
          animation: 'float1 8s ease-in-out infinite', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-150px', left: '-100px',
          width: '550px', height: '550px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,80,22,0.05) 0%, transparent 70%)',
          animation: 'float2 10s ease-in-out infinite', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '55%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,163,0,0.03) 0%, transparent 70%)',
          animation: 'float3 12s ease-in-out infinite', pointerEvents: 'none',
        }} />

        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.015,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Main content */}
        <div style={{
          width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1,
          animation: 'fadeIn 0.7s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            {/* Shield icon */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <div style={{
                position: 'absolute', inset: '-12px', borderRadius: '50%',
                background: 'rgba(124,179,66,0.2)', filter: 'blur(20px)',
              }} />
              <div style={{
                position: 'relative', width: '68px', height: '68px', borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #7CB342 0%, #33691E 100%)',
                boxShadow: '0 8px 32px rgba(124,179,66,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}>
                <ShieldCheck size={34} color="#fff" strokeWidth={2} />
              </div>
            </div>

            <h1 style={{
              fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em',
              color: '#ffffff', lineHeight: 1,
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
            }}>
              Next360
            </h1>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px',
            }}>
              <div style={{ height: '1px', width: '32px', background: 'linear-gradient(to right, transparent, rgba(124,179,66,0.5))' }} />
              <span style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(124,179,66,0.75)',
              }}>
                Admin Portal
              </span>
              <div style={{ height: '1px', width: '32px', background: 'linear-gradient(to left, transparent, rgba(124,179,66,0.5))' }} />
            </div>
          </div>

          {/* Card */}
          <div style={{
            borderRadius: '28px', padding: '1px',
            background: 'linear-gradient(135deg, rgba(124,179,66,0.25) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.02) 100%)',
          }}>
            <div style={{
              borderRadius: '28px', padding: '40px 36px',
              background: 'rgba(12,12,12,0.98)',
              backdropFilter: 'blur(40px)',
            }}>
              {/* Security badge */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '7px 16px', borderRadius: '100px',
                  background: 'rgba(124,179,66,0.08)',
                  border: '1px solid rgba(124,179,66,0.15)',
                }}>
                  <Fingerprint size={13} color="#7CB342" />
                  <span style={{
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(124,179,66,0.65)',
                  }}>
                    Secure Authentication
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block', fontSize: '9px', fontWeight: 800,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)', marginBottom: '8px', paddingLeft: '4px',
                  }}>
                    Admin Email
                  </label>
                  <div style={{
                    position: 'relative', borderRadius: '16px',
                    border: focused === 'email' ? '1px solid rgba(124,179,66,0.45)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: focused === 'email' ? '0 0 24px rgba(124,179,66,0.08)' : 'none',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.025)',
                  }}>
                    <Mail size={15} style={{
                      position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                      color: focused === 'email' ? '#7CB342' : 'rgba(255,255,255,0.15)',
                      transition: 'color 0.3s',
                    }} />
                    <input
                      type="email" autoComplete="email" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      placeholder="admin@next360.in"
                      style={{
                        width: '100%', height: '50px', background: 'transparent',
                        border: 'none', borderRadius: '16px',
                        paddingLeft: '44px', paddingRight: '16px',
                        fontSize: '13px', fontWeight: 500, color: '#fff',
                        caretColor: '#7CB342',
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block', fontSize: '9px', fontWeight: 800,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)', marginBottom: '8px', paddingLeft: '4px',
                  }}>
                    Password
                  </label>
                  <div style={{
                    position: 'relative', borderRadius: '16px',
                    border: focused === 'password' ? '1px solid rgba(124,179,66,0.45)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: focused === 'password' ? '0 0 24px rgba(124,179,66,0.08)' : 'none',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.025)',
                  }}>
                    <Lock size={15} style={{
                      position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                      color: focused === 'password' ? '#7CB342' : 'rgba(255,255,255,0.15)',
                      transition: 'color 0.3s',
                    }} />
                    <input
                      type={showPw ? 'text' : 'password'} autoComplete="current-password" required
                      value={password} onChange={e => setPassword(e.target.value)}
                      onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
                      placeholder="••••••••••"
                      style={{
                        width: '100%', height: '50px', background: 'transparent',
                        border: 'none', borderRadius: '16px',
                        paddingLeft: '44px', paddingRight: '48px',
                        fontSize: '13px', fontWeight: 500, color: '#fff',
                        caretColor: '#7CB342',
                      }}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{
                      position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', padding: '4px', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.2)',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#7CB342')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <button type="button" style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(124,179,66,0.55)',
                    padding: '4px 0',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#7CB342')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(124,179,66,0.55)')}
                  >
                    Reset Password
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit" disabled={loading}
                  className="login-btn"
                  style={{
                    position: 'relative', overflow: 'hidden',
                    width: '100%', height: '50px', borderRadius: '16px',
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    background: loading
                      ? 'rgba(124,179,66,0.3)'
                      : 'linear-gradient(135deg, #7CB342 0%, #558B2F 100%)',
                    boxShadow: loading ? 'none' : '0 4px 24px rgba(124,179,66,0.25)',
                    color: '#fff', fontSize: '11px', fontWeight: 800,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {!loading && (
                    <div className="btn-shimmer" style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
                      transform: 'translateX(-100%)',
                    }} />
                  )}
                  {loading && <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />}
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {loading ? 'Authenticating...' : 'Access Command Center'}
                  </span>
                  {!loading && <ArrowRight size={14} style={{ position: 'relative', zIndex: 1 }} />}
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '10px', marginTop: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#7CB342', boxShadow: '0 0 8px rgba(124,179,66,0.5)',
              }} />
              <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.2)' }}>
                System Online
              </span>
            </div>
            <p style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.08)' }}>
              Next360 Platform · Restricted Access · v2.4.0
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
