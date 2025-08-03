import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <Container className="relative isolate flex h-full flex-col items-center justify-center py-20 text-center sm:py-32">
        <CirclesBackground className="absolute top-1/2 left-1/2 -z-10 mt-44 w-[68.125rem] -translate-x-1/2 -translate-y-1/2 stroke-green-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />
        <p className="text-sm font-semibold text-green-900">404</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-green-950">Page not found</h1>
        <p className="mt-2 text-lg text-green-700">Sorry, we couldn’t find the page you’re looking for.</p>
        <Button href="/" variant="outline" className="mt-8">
          Go back home
        </Button>
      </Container>
    </Layout>
  )
}
