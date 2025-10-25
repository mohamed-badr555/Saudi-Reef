import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper';
import GenericPage from '@/Components/pages/GenericPage/GenericPage';

export default function OutgoingLettersPage() {
  return (
    <PageWrapper currentPage="الخطابات الصادرة">
      <GenericPage pageName="الخطابات الصادرة" />
    </PageWrapper>
  );
}
