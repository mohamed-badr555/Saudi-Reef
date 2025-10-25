
import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper';
import HomePage from './../Components/pages/Home/Home';


export default function Home() {
  return (
    <PageWrapper currentPage="Dashboard">
      <HomePage/>
    </PageWrapper>
  );
}
