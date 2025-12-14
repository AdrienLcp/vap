import './tag.sass'

export const Tag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className='tag'>
    {children}
  </span>
)
