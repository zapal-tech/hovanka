import {
  BoldFeature,
  FeatureProviderServer,
  HeadingFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { RichTextAdapterProvider } from 'payload'

export const baseHeadingFeature = HeadingFeature({
  enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'],
})

export const baseEditorFeatures: FeatureProviderServer<any, any, any>[] = [
  ParagraphFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  InlineCodeFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  InlineToolbarFeature(),
]

export const getDefaultEditor = () =>
  lexicalEditor({
    features: [...baseEditorFeatures],
  }) as unknown as RichTextAdapterProvider<{}, any, any>
