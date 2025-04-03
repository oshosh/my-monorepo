export const CSS_COLOR_PROPERTIES = [
  'color',
  'backgroundColor',
  'borderColor',
  'outlineColor',
  'textDecorationColor',
  'caretColor',
  'columnRuleColor',
  'fill',
  'stroke',
] as const;

// 튜플 readonly
// type CSSColorPropertiesType = readonly [
//   'color',
//   'backgroundColor',
//   'borderColor',
//   'outlineColor',
//   'textDecorationColor',
//   'caretColor',
//   'columnRuleColor',
//   'fill',
//   'stroke'
// ];
// type Tuple = typeof CSS_COLOR_PROPERTIES

// 튜플 -> 유니온
// type CSSColorProperty =
//   | 'color'
//   | 'backgroundColor'
//   | 'borderColor'
//   | 'outlineColor'
//   | 'textDecorationColor'
//   | 'caretColor'
//   | 'columnRuleColor'
//   | 'fill'
//   | 'stroke';
// type CSSColorProperties = typeof CSS_COLOR_PROPERTIES[number];
