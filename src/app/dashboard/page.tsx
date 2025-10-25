import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper'
import HomePage from '@/Components/pages/Home/Home'
import React from 'react'

const page = () => {
  return (
       <PageWrapper currentPage="Dashboard">
      <HomePage/>
    </PageWrapper>
  )
}

export default page