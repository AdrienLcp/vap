import { UserPage } from '@/features/user/presentation/components/user-page'

const Page: React.FC<PageProps<'/admin/users/[userId]'>> = async ({ params }) => {
  const { userId } = await params

  return <UserPage userId={userId} />
}

export default Page
