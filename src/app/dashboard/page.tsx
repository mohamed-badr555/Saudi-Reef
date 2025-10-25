import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper'
import HomePage from '@/Components/pages/Home/Home'

const DashboardPage = () => {
  return (
    <PageWrapper currentPage="لوحة البيانات">
      <HomePage/>
    </PageWrapper>
  )
}

export default DashboardPage