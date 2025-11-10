'use client'

import { ChevronUpIcon } from 'lucide-react'
import {
  DisclosurePanel,
  type DisclosurePanelProps,
  Heading,
  Disclosure as ReactAriaDisclosure,
  type DisclosureProps as ReactAriaDisclosureProps
} from 'react-aria-components'

import { Button } from '@/presentation/components/ui/pressables/button'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './disclosure.sass'

type DisclosureProps = Omit<ReactAriaDisclosureProps, 'children'> & {
  children: DisclosurePanelProps['children']
  Title: React.ReactElement
}

export const Disclosure: React.FC<DisclosureProps> = ({
  children,
  className,
  Title,
  ...disclosureRestProps
}) => (
  <ReactAriaDisclosure
    className={values => reactAriaClassNames(values, className, 'disclosure')}
    {...disclosureRestProps}
  >
    <Heading>
      <Button slot='trigger'>
        {Title}

        <ChevronUpIcon className='chevron-icon' />
      </Button>
    </Heading>

    <DisclosurePanel className='disclosure-panel'>{children}</DisclosurePanel>
  </ReactAriaDisclosure>
)
