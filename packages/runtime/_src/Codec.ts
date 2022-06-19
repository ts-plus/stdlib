export type Codec<X> =
  & Decoder<X>
  & Encoder<X>
  & Guard<X>
  & Make<X>
