import PageWrapper from '@/Components/layout/PageWrapper/PageWrapper';
import GenericPage from '@/Components/pages/GenericPage/GenericPage';

export default function IncomingLettersPage() {
  return (
    <PageWrapper currentPage="الخطابات الواردة">
      <GenericPage pageName="الخطابات الواردة" />
    </PageWrapper>
  );
}
