import { Button, type ButtonProps } from '@/presentation/components/ui/pressables/button'

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'variant'>

export const SubmitButton: React.FC<SubmitButtonProps> = (submitButtonProps) => (
  <Button {...submitButtonProps} type='submit' variant='filled' />
)
