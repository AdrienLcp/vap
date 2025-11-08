import {
  Slider as ReactAriaSlider,
  type SliderProps as ReactAriaSliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack
} from 'react-aria-components'

import { Label } from '@/presentation/components/ui/label'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './slider.sass'

type SliderProps = ReactAriaSliderProps & {
  label?: string
  thumbLabels?: string[]
}

export const Slider: React.FC<SliderProps> = ({
  className,
  label,
  thumbLabels,
  ...sliderRestProps
}) => (
  <ReactAriaSlider
    className={(values) => reactAriaClassNames(values, className, 'slider')}
    {...sliderRestProps}
  >
    <div className='slider-header'>
      <Label>{label}</Label>

      <SliderOutput className='output'>
        {({ state }) => state.values.map((_, index) => state.getThumbValueLabel(index)).join(' - ')}
      </SliderOutput>
    </div>

    <SliderTrack className='track'>
      {({ state }) =>
        state.values.map((_, index) => (
          <SliderThumb
            aria-label={thumbLabels?.[index]}
            className='thumb'
            index={index}
            // biome-ignore lint/suspicious/noArrayIndexKey: react-aria-slider-thumb requires index as key
            key={index}
          />
        ))
      }
    </SliderTrack>
  </ReactAriaSlider>
)
