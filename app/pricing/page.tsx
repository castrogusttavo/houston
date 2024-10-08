'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (plan: 'solo' | 'startup' | 'business') => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout_sessions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ plan }),
        },
      )

      const data = await res.json()

      if (res.ok && data.sessionId) {
        const stripe = await stripePromise
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          })
          if (error) {
            console.error('Erro ao redirecionar para o Stripe:', error)
          }
        }
      } else {
        console.error('Erro ao criar sessão de pagamento:', data.error)
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="antialiased font-sans min-h-screen transition-[grid-template-columns] duration-300 ease-in-out">
      <Header />
      <main className="max-w-screen min-h-screen overflow-hidden">
        <div className="item-center mx-auto mt-12 mb-10 grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-center text-sm font-normal leading-6 tracking-[-0.4px] text-grey-600 sm:text-lg">
              I love that they offer free icon requests
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-center text-sm font-normal leading-6 tracking-[-0.4px] text-grey-600 sm:text-lg">
              Amazing icon library
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="currentColor"
                className="h-5 w-5 text-[#FF8A00]"
              >
                <path
                  d="M11.9961 1.25C13.0454 1.25 13.8719 2.04253 14.3995 3.11191L16.1616 6.66516C16.215 6.77513 16.3417 6.92998 16.5321 7.07164C16.7223 7.21315 16.9086 7.29121 17.0311 7.3118L20.2207 7.84613C21.3729 8.03973 22.3386 8.60449 22.6521 9.5879C22.9653 10.5705 22.5064 11.5916 21.6778 12.4216L21.677 12.4225L19.1991 14.9209C19.1009 15.0199 18.9909 15.2064 18.9219 15.4494C18.8534 15.6908 18.8473 15.9107 18.8784 16.0527L18.8788 16.0547L19.5877 19.1454C19.8818 20.4317 19.7843 21.7073 18.8771 22.3742C17.9667 23.0433 16.7227 22.7467 15.5925 22.0736L12.6026 20.289C12.477 20.214 12.2614 20.1532 12.0011 20.1532C11.7427 20.1532 11.5226 20.2132 11.3888 20.291L11.3869 20.2921L8.40288 22.0732C7.27405 22.7487 6.03154 23.04 5.12111 22.3702C4.21449 21.7032 4.11214 20.43 4.40711 19.1447L5.1159 16.0547L5.11633 16.0527C5.14741 15.9107 5.14133 15.6908 5.0728 15.4494C5.0038 15.2064 4.89379 15.0199 4.79558 14.9209L2.31585 12.4206C1.49265 11.5906 1.03521 10.5704 1.34595 9.58925C1.65759 8.60525 2.62143 8.0398 3.77433 7.84606L6.96132 7.31219L6.96233 7.31202C7.07917 7.29175 7.2627 7.21456 7.45248 7.07268C7.64261 6.93054 7.76959 6.77535 7.82312 6.66516L7.82582 6.65967L9.58562 3.11097L9.58632 3.10957C10.119 2.04108 10.948 1.25 11.9961 1.25Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-center text-sm font-normal leading-6 tracking-[-0.4px] text-grey-600 sm:text-lg">
              Affordable price & modern design
            </span>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center px-6 pb-20">
          <div className="mb-12 space-y-3 text-center">
            <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-[-1px] text-grey-900 sm:text-5xl sm:leading-[54px]">
              The small details you wanted to make your design more beautiful
            </h1>
            <p className="mx-auto max-w-max rounded-lg bg-blue-50 px-4 py-1 text-center text-lg font-medium text-blue-500 sm:text-base">
              Get the super beautiful icon library, created for developers and
              designers
            </p>
          </div>
          <div className="grid w-max grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 xl:grid-cols-3 lg:gap-6">
            <div className="h-full px-6 py-8 border border-grey-200 rounded-xl lg:w-auto max-w-[400px]">
              <h4 className="text-4xl mb-4 text-green-700">Solo</h4>
              <p className="min-h-[4rem] mb-3 text-grey-500 text-md">
                Essential icons for solo developers.
              </p>
              <div className="flex items-start h-[5.5rem] mb-6">
                <h3 className="text-4xl">$</h3>
                <h2 className="text-7xl leading-none font-semibold">4,00</h2>
              </div>
              <button
                onClick={() => handleCheckout('solo')}
                disabled={loading}
                className="text-md tracking-[.05em] font-bold uppercase inline-flex justify-center items-center text-center rounded-lg h-11 px-7 text-green-700 transition-colors hover:text-green-900 w-full mb-6 bg-green-200 cursor-pointer"
              >
                Buy now
              </button>
              <ul className="max-w-[366px]">
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    License key for <strong>1 user</strong>
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Access to 9 icon styles
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    NPM package for easy integration with
                    <br />
                    JS frameworks
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Request missing icons <strong>7/month</strong>
                  </p>
                </li>
              </ul>
            </div>
            <div className="max-w-[400px] h-full px-6 py-8 border-4 border-grey-200 rounded-xl lg:w-auto">
              <h4 className="text-5xl mb-4 text-softis-mid font-bold">
                Startup
              </h4>
              <p className="min-h-[4rem] mb-3 text-grey-500 text-md">
                Collaboration tools for small teams.
              </p>
              <div className="flex items-center h-[5.5rem] mb-6">
                <h3 className="text-4xl">$</h3>
                <h2 className="text-8xl leading-none font-bold">8,00</h2>
              </div>
              <button
                onClick={() => handleCheckout('startup')}
                disabled={loading}
                className="text-md tracking-[.05em] font-bold uppercase inline-flex justify-center items-center text-center rounded-lg h-11 px-7 text-green-700 transition-colors hover:text-green-900 w-full mb-6 bg-green-200 cursor-pointer"
              >
                Buy now
              </button>
              <ul className="max-w-[366px]">
                <li className="flex items-center py-5 border-t border-grey-100">
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Includes everything in the Solo plan, plus:
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    License key for <strong>5 users</strong>
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Access to over 36,000+ icons
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Figma files for direct design integration
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    SVG icons for flexible usage
                  </p>
                </li>
              </ul>
            </div>
            <div className="max-w-[400px] h-full px-6 py-8 border border-grey-200 rounded-xl lg:w-auto">
              <h4 className="text-4xl mb-4 text-green-700">Business</h4>
              <p className="min-h-[4rem] mb-3 text-grey-500 text-md">
                Unlimited projects for large teams.
              </p>
              <div className="flex items-center h-[5.5rem] mb-6">
                <h3 className="text-4xl">$</h3>
                <h2 className="text-7xl leading-none font-semibold">16,99</h2>
              </div>
              <button
                onClick={() => handleCheckout('business')}
                disabled={loading}
                className="text-md tracking-[.05em] font-bold uppercase inline-flex justify-center items-center text-center rounded-lg h-11 px-7 text-green-700 transition-colors hover:text-green-900 w-full mb-6 bg-green-200 cursor-pointer"
              >
                Buy now
              </button>
              <ul className="max-w-[366px]">
                <li className="flex items-center py-5 border-t border-grey-100">
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Includes everything in the Startup plan, plus:
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    License key for <strong>25 users</strong>
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Unlimited projects (no project number restriction)
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Exclusive Figma plugin for quick,
                    <br />
                    customizable design. <strong>(Coming Soon!)</strong>
                  </p>
                </li>
                <li className="flex items-center py-5 border-t border-grey-100">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <p className="font-xs font-normal sm:text-md ml-4">
                    Priority support for request and updates.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative mt-5 pb-15 w-full flex items-start overflow-hidden rounded-xl border-b-2 border-l border-r border-t border-grey-200 bg-gray-100 p-8">
            <img
              src="/pricingDetailsObject.png"
              className="absolute bottom-0 left-0 hidden h-[200px] md:block"
              alt=""
            />
            <div className="relative z-10 flex-1">
              <h2 className="mb-4 font-medium text-grey-800 text-lg">Why?</h2>
              <p className="text-grey-800 text-sm">
                Save time and effort by selecting the right icon library. <br />{' '}
                Poorly designed icons can be difficult and users may get
                confused or frustrated. <br /> Houston Pro provides the
                beautiful and consistent icons.
              </p>
              <p className="mt-4 max-w-max rounded-lg bg-blue-100 px-3 py-1 text-sm font-normal text-black">
                For developers, the icons are well optimized for blazing fast
                performance.
              </p>
            </div>
            <div>
              <p className="text-grey-800 text-lg font-medium">Specially...</p>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    Save time
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    Stand out against competitors
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    Grab users attention & create consistent UI
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    Your highly desired &quot;Human support&quot;
                  </span>
                </div>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="currentColor"
                    className="text-green-700"
                  >
                    <path
                      d="M5 14L8.5 17.5L19 6.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    Free future updates for the lifetime package
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="pl-5 text-left text-2xl text-grey-900 sm:pl-0 sm:text-center font-semibold">
            Design impressions
          </h1>
          <div className="relative z-20 overflow-hidden mt-7 duration-200">
            <ul className="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll">
              <img
                src="/home/components/Image02.png"
                alt="Image 02"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image10.png"
                alt="Image 10"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image09.png"
                alt="Image 09"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image08.png"
                alt="Image 08"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image07.png"
                alt="Image 07"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image06.png"
                alt="Image 06"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image02.png"
                alt="Image 02"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image10.png"
                alt="Image 10"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image09.png"
                alt="Image 09"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image08.png"
                alt="Image 08"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image07.png"
                alt="Image 07"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image06.png"
                alt="Image 06"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
            </ul>
          </div>
          <div className="relative z-20 overflow-hidden duration-200">
            <ul className="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll direction-reverse">
              <img
                src="/home/components/Image01.png"
                alt="Image 01"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image04.png"
                alt="Image 04"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image13.png"
                alt="Image 13"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image05.png"
                alt="Image 05"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image03.png"
                alt="Image 03"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image12.png"
                alt="Image 12"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image01.png"
                alt="Image 01"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image04.png"
                alt="Image 04"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image13.png"
                alt="Image 13"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image05.png"
                alt="Image 05"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image03.png"
                alt="Image 03"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
              <img
                src="/home/components/Image12.png"
                alt="Image 12"
                className="max-h-[20rem] sm:max-h-[30rem] object-cover rounded-lg"
              />
            </ul>
          </div>
        </div>
        <div className="top-[#FFF] flex w-full flex-col items-center gap-6 border-b border-gray-100 px-5 py-[50px] sm:py-[70px]">
          <h3 className="text-center text-xl font-semibold leading-normal tracking-[-1px] text-grey-900 sm:text-3xl">
            Need help choosing a plan?
          </h3>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-10 sm:space-y-0">
            <p className="text-grey-500">
              Send us a message:{' '}
              <a
                href="https://x.com/gustta_dev"
                className="underline text-black underline-offset-4"
                target="_blank"
              >
                Twitter(X)
              </a>
            </p>
            <p className="text-grey-500">
              Or mail us:{' '}
              <a
                href="mailto:hello.softis@gmail.com"
                className="underline text-black underline-offset-4"
                target="_blank"
              >
                hello.softis@gmail.com
              </a>
            </p>
          </div>
          <div className="mt-5 rounded-lg bg-blue-100 px-3 py-1.5 text-center text-ms text-blue-900 sm:mt-[34px] sm:text-left sm:text-base">
            If you are a student or a new founder, take our love with{' '}
            <span className="font-bold">50% OFF. </span>
            <a
              href="https://linkedin.com/in/castrogusttavo"
              className="underline"
            >
              Send us a message
            </a>
          </div>
        </div>
        <div className="relative flex h-[500px] flex-col items-center justify-center px-10 text-center bg-[url('https://hugeicons.com/home/pro-footer-sm-bg.png')] sm:bg-[url('https://hugeicons.com/pro-footer-bg.png')] bg-cover bg-no-repeat bg-center">
          <h5 className="text-center text-white text-3xl sm:text-5xl font-semibold">
            Design beautifully with Houston Pro
          </h5>
          <div className="text-center mt-5">
            <span className="text-zinc-400 font-normal">
              36,000+ beautiful icons. Whether it&apos; for SaaS, websites,
              print, or any modern interface,
              <br />
              Houston Pro has you covered.
            </span>{' '}
            {''}
            <span className="text-slate-300 font-semibold">
              Made for developers and designers.
            </span>
          </div>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
            <Link
              href="https://www.npmjs.com/package/@houstonicons/react"
              target="_blank"
              className="inline-flex relative items-center justify-center font-bold whitespace-nowrap text-sm ring-off set-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary text-grey-900 border-none hover:bg-[#e7e7e7]/80 py-2 bg-white px-12 w-full sm:max-w-max h-12 rounded-full"
            >
              Use for free
            </Link>
            <Link
              href="https://www.npmjs.com/package/@houstonicons/pro"
              className="inline-flex relative items-center justify-center font-bold whitespace-nowrap text-sm ring-off set-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary text-[#1d3208] border-none hover:bg-[#afe67f]/50 py-2 bg-[#afe67f] px-12 w-full sm:max-w-max h-12 rounded-full"
            >
              Go Pro
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
