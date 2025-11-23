import {
  Switch as ReactAriaSwitch,
  type SwitchProps as ReactAriaSwitchProps
} from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './switch.sass'

type SwitchProps = ReactAriaSwitchProps & {
  label: string
}

export const Switch: React.FC<SwitchProps> = ({ className, label, ...switchRestProps }) => (
  <ReactAriaSwitch
    className={(values) => reactAriaClassNames(values, className, 'switch')}
    {...switchRestProps}
  >
    <div className='track'>
      <div className='thumb' />
    </div>

    <span className='label'>{label}</span>
  </ReactAriaSwitch>
)
