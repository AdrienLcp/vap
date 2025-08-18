import './auth-wrapper.sass'

export const AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className='auth-wrapper'>
    {children}
  </main>
)
