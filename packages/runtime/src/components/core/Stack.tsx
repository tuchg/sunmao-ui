import { implementRuntimeComponent } from '../../utils/buildKit';
import React, { ReactNode } from 'react';
import { css, CSSObject } from '@emotion/css';
import { Static, Type } from '@sinclair/typebox';
import { StringUnion } from '../../utils/stringUnion';

export const StackPropertySchema = Type.Object({
  align: StringUnion(['start', 'end', 'center', 'baseline'], {
    title: 'Align Items',
    category: 'Layout',
  }),
  direction: StringUnion(['vertical', 'horizontal'], {
    title: 'Direction',
    category: 'Layout',
  }),
  justify: StringUnion(
    ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
    {
      title: 'Justify Content',
      category: 'Layout',
    }
  ),
  spacing: Type.Number({
    title: 'Spacing',
    category: 'Layout',
  }),
  wrap: Type.Boolean({
    title: 'Wrap',
    category: 'Layout',
    description: 'Auto wrap line, when horizontal effective',
  }),
});

const StateSchema = Type.Object({});

export type StackProps = Static<typeof StackPropertySchema> & {
  cssStyle?: string;
};

const Stack = React.forwardRef<HTMLDivElement, StackProps & { children: ReactNode }>(
  (
    { cssStyle, align, direction = 'horizontal', spacing = 12, children, wrap, justify },
    ref
  ) => {

    const style: CSSObject = {
      alignItems: align,
      justifyContent: justify,
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      display: 'inline-flex',
      columnGap: spacing,
      rowGap: spacing,
      flexWrap: wrap ? 'wrap' : 'nowrap',
    };

    return (
      <div
        ref={ref}
        className={css`
          ${style}
          ${cssStyle}
        `}
      >
        {children}
      </div>
    );
  }
);

export default implementRuntimeComponent({
  version: 'core/v1',
  metadata: {
    name: 'stack',
    displayName: 'Stack',
    description: '',
    isDraggable: true,
    isResizable: false,
    exampleProperties: {
      spacing: 12,
      direction: 'horizontal',
      align: 'start',
      wrap: '',
      justify: '',
    },
    exampleSize: [4, 1],
    annotations: {
      category: 'Layout',
    },
  },
  spec: {
    properties: StackPropertySchema,
    state: StateSchema,
    methods: {},
    slots: ['content'],
    styleSlots: ['content'],
    events: [],
  },
})(({ customStyle, elementRef, slotsElements, ...restProps }) => {
  return (
    <Stack cssStyle={customStyle?.content} ref={elementRef} {...restProps}>
      {slotsElements.content}
    </Stack>
  );
});