import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

type Props = {}

export default function HomeTemplate({}: Props) {
  return (
    <>
        <Header />
        <main style={{minHeight:600}}>
        <Outlet />
        </main>
        <Footer />
    </>
  )
}